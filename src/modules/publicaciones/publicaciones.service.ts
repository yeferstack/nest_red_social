import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';
import { Model } from 'mongoose';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { SearchPublicacionDto } from './dto/search-publicacion.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private readonly publicacionModel: Model<PublicacionDocument>,
    ) {}

    /**
     * Crear una nueva publicación
     */
    async create(dto: CreatePublicacionDto) {
        const publicacion = await this.publicacionModel.create(dto);
        
        // Populate usuario para retornar datos completos
        await publicacion.populate('usuario_id');

        return ResponseHelper.success(publicacion, 201);
    }

    /**
     * Obtener todas las publicaciones activas con paginación
     */
    async findAll(search: SearchPublicacionDto) {
        const filter: any = { activo: true };

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        if (search.contenido) {
            filter.contenido = {
                $regex: search.contenido,
                $options: 'i',
            };
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.publicacionModel
            .find(filter)
            .populate('usuario_id')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.publicacionModel.countDocuments(filter);

        return ResponseHelper.success({ total, page, limit, data });
    }

    /**
     * Obtener publicaciones inactivas
     */
    async findInactive() {
        const publicaciones = await this.publicacionModel
            .find({ activo: false })
            .populate('usuario_id')
            .sort({ createdAt: -1 });

        return ResponseHelper.success(publicaciones);
    }

    /**
     * Buscar una publicación por su id
     */
    async findOne(id: string) {
        const publicacion = await this.publicacionModel
            .findById(id)
            .populate('usuario_id');

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        return ResponseHelper.success(publicacion);
    }

    /**
     * Actualizar una publicación completa
     */
    async update(id: string, dto: UpdatePublicacionDto) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        const updatedPublicacion = await this.publicacionModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('usuario_id');

        return ResponseHelper.success(updatedPublicacion);
    }

    /**
     * Actualización parcial
     */
    async partialUpdate(id: string, dto: Partial<Publicacion>) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        const updatedPublicacion = await this.publicacionModel
            .findByIdAndUpdate(id, { $set: dto }, { new: true })
            .populate('usuario_id');

        return ResponseHelper.success(updatedPublicacion);
    }

    /**
     * Eliminación lógica de publicación
     */
    async remove(id: string) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        const deletedPublicacion = await this.publicacionModel
            .findByIdAndUpdate(id, { activo: false }, { new: true });

        return ResponseHelper.success(deletedPublicacion);
    }

    /**
     * Restaurar publicación eliminada
     */
    async restore(id: string) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        const restoredPublicacion = await this.publicacionModel
            .findByIdAndUpdate(id, { activo: true }, { new: true });

        return ResponseHelper.success(restoredPublicacion);
    }
}
