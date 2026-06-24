import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seguidor, SeguidorDocument } from './schemas/seguidor.schema';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { SearchSeguidorDto } from './dto/search-seguidor.dto';

@Injectable()
export class SeguidoresService {
    constructor(
        @InjectModel(Seguidor.name)
        private readonly seguidorModel:
        Model<SeguidorDocument>,
    ) {}

    /**
     * Metodo para crear un nuevo seguidor
     */
    async create(
        dto: CreateSeguidorDto,
    ) {
        const seguidor =
        await this.seguidorModel.create(dto);

        return ResponseHelper.success(
            seguidor,
            201,
        );
    }

    /**
     * Metodo para consultar seguidores activos
     */
    async findAll(search: SearchSeguidorDto) {
        const filter: any = { activo: true };

        if (search.seguidor_id) {
            filter.seguidor_id = search.seguidor_id;
        }

        if (search.seguido_id) {
            filter.seguido_id = search.seguido_id;
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.seguidorModel
            .find(filter)
            .populate('seguidor_id')
            .populate('seguido_id')
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.seguidorModel.countDocuments(filter);

        return ResponseHelper.success({ total, page, limit, data });
    }

    /**
     * Consulta seguidores eliminados logicamente
     */
    async findInactive() {
        const seguidores = await this.seguidorModel
            .find({ activo: false })
            .populate('seguidor_id')
            .populate('seguido_id');

        return ResponseHelper.success(seguidores);
    }

    /**
     * Buscar un seguidor por su id
     */
    async findOne(id: string) {
        const seguidor = await this.seguidorModel
            .findById(id)
            .populate('seguidor_id')
            .populate('seguido_id');

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        return ResponseHelper.success(seguidor);
    }

    /**
     * Actualizar un seguidor
     */
    async update(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        const updatedSeguidor = await this.seguidorModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );
        return ResponseHelper.success(updatedSeguidor);
    }

    /**
     * Eliminacion logica
     */
    async remove(id: string) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        const deletedSeguidor = await this.seguidorModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );
        return ResponseHelper.success(deletedSeguidor);
    }

    /**
     * Restaurar seguidor eliminado
     */
    async restore(id: string) {
        const seguidor = await this.seguidorModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        const restoredSeguidor = await this.seguidorModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );
        return ResponseHelper.success(restoredSeguidor);
    }
}
