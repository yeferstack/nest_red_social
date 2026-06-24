import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleDocument, Role } from './schemas/roles.schema';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name) 
        private readonly roleModel: 
        Model<RoleDocument>,
    ) {}

    /**
     * metodo para crear un nuevo rol
     */
    async create(
        dto: Partial<Role>,
    ){
        const role =
        await this.roleModel.create(dto);

        return ResponseHelper.success(
            role,
            201,
        );
    }

    /** metodo para consultar roles 
     *
     */
    async findAll(){
        const roles =
        await this.roleModel.find({activo: true,});
        
        return ResponseHelper.success(roles);
    }

    /**
     * Consulta roles eliminados logicamente
     */
    async findInactive(){
        const roles = await this.roleModel.find({activo: false,});

        return ResponseHelper.success(roles);
    }

    /**
     * buscar un rol por su id
     * */
    async findOne(id: string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }

        return ResponseHelper.success(role);
    }

    /**
     * actualizar un rol 
     * */
    async update(id: string, dto: UpdateRoleDto) {
        const role = await this.roleModel.findById(id);

        if (!role) {
            throw new NotFoundException('ROL no encontrado');
        }

        const updatedRole = await this.roleModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updatedRole);
    }

    /**
     * actualizacion Parcial 
     * */
    async partialUpdate(id: string, dto: Partial<Role>){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no encontrado');
        }
        const updatedRole = await this.roleModel.findByIdAndUpdate(id,{$set: dto}, { new: true });
        return ResponseHelper.success(updatedRole);
    }

    /**
     * Elimincion logica 
     * */
    async remove(id: string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no encontrado');
        }

        const deletedRole = await this.roleModel.findByIdAndUpdate(id, { activo: false }, { new: true });
        return ResponseHelper.success(deletedRole);
    }

    /**
     * Restaurar rol eliminado
     * */
    async restore(id: string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('ROL no encontrado');
        }

        const restoredRole = await this.roleModel.findByIdAndUpdate(id, { activo: true }, { new: true });
        return ResponseHelper.success(restoredRole);
    }
}