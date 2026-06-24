import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comentario, ComentarioDocument } from './schemas/comentarios.schema';
import { Model } from 'mongoose';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { SearchComentarioDto } from './dto/search-comentario.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentario.name)
        private readonly comentarioModel: Model<ComentarioDocument>,
    ) {}

    /**
     * Crear un nuevo comentario
     */
    async create(dto: CreateComentarioDto) {
        const comentario = await this.comentarioModel.create(dto);

        await comentario.populate([
            { path: 'usuario_id' },
            { path: 'publicacion_id' },
        ]);

        return ResponseHelper.success(comentario, 201);
    }

    /**
     * Obtener todos los comentarios activos con paginación
     */
    async findAll(search: SearchComentarioDto) {
        const filter: any = { activo: true };

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        if (search.publicacion_id) {
            filter.publicacion_id = search.publicacion_id;
        }

        if (search.contenido) {
            filter.contenido = {
                $regex: search.contenido,
                $options: 'i',
            };
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.comentarioModel
            .find(filter)
            .populate([
                { path: 'usuario_id' },
                { path: 'publicacion_id' },
            ])
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.comentarioModel.countDocuments(filter);

        return ResponseHelper.success({ total, page, limit, data });
    }

    /**
     * Obtener comentarios inactivos
     */
    async findInactive() {
        const comentarios = await this.comentarioModel
            .find({ activo: false })
            .populate([
                { path: 'usuario_id' },
                { path: 'publicacion_id' },
            ])
            .sort({ createdAt: -1 });

        return ResponseHelper.success(comentarios);
    }

    /**
     * Buscar un comentario por su id
     */
    async findOne(id: string) {
        const comentario = await this.comentarioModel
            .findById(id)
            .populate([
                { path: 'usuario_id' },
                { path: 'publicacion_id' },
            ]);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        return ResponseHelper.success(comentario);
    }

    /**
     * Obtener comentarios de una publicación
     */
    async findByPublicacion(publicacion_id: string, search: SearchComentarioDto) {
        const filter: any = { publicacion_id, activo: true };

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.comentarioModel
            .find(filter)
            .populate('usuario_id')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.comentarioModel.countDocuments(filter);

        return ResponseHelper.success({ total, page, limit, data });
    }

    /**
     * Actualizar un comentario completo
     */
    async update(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const updatedComentario = await this.comentarioModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate([
                { path: 'usuario_id' },
                { path: 'publicacion_id' },
            ]);

        return ResponseHelper.success(updatedComentario);
    }

    /**
     * Actualización parcial
     */
    async partialUpdate(id: string, dto: UpdateComentarioDto) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const updatedComentario = await this.comentarioModel
            .findByIdAndUpdate(id, { $set: dto }, { new: true })
            .populate([
                { path: 'usuario_id' },
                { path: 'publicacion_id' },
            ]);

        return ResponseHelper.success(updatedComentario);
    }

    /**
     * Eliminación lógica de comentario
     */
    async remove(id: string) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const deletedComentario = await this.comentarioModel
            .findByIdAndUpdate(id, { activo: false }, { new: true });

        return ResponseHelper.success(deletedComentario);
    }

    /**
     * Restaurar comentario eliminado
     */
    async restore(id: string) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const restoredComentario = await this.comentarioModel
            .findByIdAndUpdate(id, { activo: true }, { new: true });

        return ResponseHelper.success(restoredComentario);
    }
}