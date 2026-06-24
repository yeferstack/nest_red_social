import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reaccion, ReaccionDocument } from './schemas/reaccion.schema';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { SearchReaccionDto } from './dto/search-reaccion.dto';

@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reaccion.name)
        private readonly reaccionModel:
        Model<ReaccionDocument>,
    ) {}

    /**
     * Metodo para crear una nueva reaccion
     */
    async create(
        dto: CreateReaccionDto,
    ) {
        const reaccion =
        await this.reaccionModel.create(dto);

        return ResponseHelper.success(
            reaccion,
            201,
        );
    }

    /**
     * Metodo para consultar reacciones activas
     */
    async findAll(search: SearchReaccionDto) {
        const filter: any = { activo: true };

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        if (search.publicacion_id) {
            filter.publicacion_id = search.publicacion_id;
        }

        if (search.tipo) {
            filter.tipo = search.tipo;
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.reaccionModel
            .find(filter)
            .populate('usuario_id')
            .populate('publicacion_id')
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.reaccionModel.countDocuments(filter);

        return ResponseHelper.success({ total, page, limit, data });
    }

    /**
     * Consulta reacciones eliminadas logicamente
     */
    async findInactive() {
        const reacciones = await this.reaccionModel
            .find({ activo: false })
            .populate('usuario_id')
            .populate('publicacion_id');

        return ResponseHelper.success(reacciones);
    }

    /**
     * Buscar una reaccion por su id
     */
    async findOne(id: string) {
        const reaccion = await this.reaccionModel
            .findById(id)
            .populate('usuario_id')
            .populate('publicacion_id');

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        return ResponseHelper.success(reaccion);
    }

    /**
     * Actualizar una reaccion
     */
    async update(id: string, dto: UpdateReaccionDto) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const updatedReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            dto,
            { new: true },
        );
        return ResponseHelper.success(updatedReaccion);
    }

    /**
     * Eliminacion logica
     */
    async remove(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const deletedReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );
        return ResponseHelper.success(deletedReaccion);
    }

    /**
     * Restaurar reaccion eliminada
     */
    async restore(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reaccion no encontrada');
        }

        const restoredReaccion = await this.reaccionModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );
        return ResponseHelper.success(restoredReaccion);
    }
}
