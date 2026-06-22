import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { ResponseHelper } from 'src/common/helpers/response.helper';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto/update-user.dto";
import { dot } from "node:test/reporters";

@Injectable()
export class UsuariosService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    /**
     * Metodo para la creacion de usuarios
     */
    async create(dto: CreateUserDto) {
        const exists = await this.userModel.findOne({ correo: dto.correo });

        if (exists) {
            throw new BadRequestException('Correo ya registrado');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModel.create({
            ...dto,
            password: hashedPassword,
        });

        return ResponseHelper.success(user, 201);
    }

    /**
     * consulta usuario
     */
    async findAll(search: SearchUserDto) {
        const filter: any = { activo: true };

        if (search.nombre) {
            filter.nombre = {
                $regex: search.nombre,
                $options: 'i',
            };
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;
        
        // consulta
        const data = await this.userModel.find(filter).populate('rol').skip((page - 1) * limit).limit(limit);
        
        // Contador de documentos = contador de usuarios 
        const total = await this.userModel.countDocuments(filter);

        return ResponseHelper.success({ total, page, limit, data });
    }

    /**
     * consulta por id usuario
     */
    async findOne(id: string) {
        const user = await this.userModel.findById(id).populate('rol_');
        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }
        return ResponseHelper.success(user);
    }

    /**
     * Actualizacion de usuario
     */
    async update(id: string, dto: UpdateUserDto) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('No se encontro el Usuario');
        }
        
        const updateuser = await this.userModel.findByIdAndUpdate(id, dto, { new: true });

        return ResponseHelper.success(updateuser);
    }

    /**
     * Soft delete 
     */
    async remove(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new NotFoundException('Usuario no Encontrado');
        }

        if(dot.passaword){
          dot.password= await bcrypt.hash(dot.password,10)
        }
        const deletedUser = await this.userModel.findByIdAndUpdate(id, { activo: false },{new:true});

        return ResponseHelper.success(deletedUser);
    }
}