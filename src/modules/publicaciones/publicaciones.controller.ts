import { Controller, Get, Post, Body, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { SearchPublicacionDto } from './dto/search-publicacion.dto';
import { Types } from 'mongoose';

@ApiTags('Publicaciones')
@Controller('publicaciones')
export class PublicacionesController {
    constructor(
        private readonly service: PublicacionesService,
    ) {}

    /**
     * Crear una nueva publicación
     */
    @Post()
    create(@Body() dto: CreatePublicacionDto) {
        return this.service.create(dto);
    }

    /**
     * Obtener todas las publicaciones activas
     */
    @Get()
    findAll(@Query() search: SearchPublicacionDto) {
        return this.service.findAll(search);
    }

    /**
     * Obtener publicaciones inactivas
     */
    @Get('inactivas')
    findInactive() {
        return this.service.findInactive();
    }

    /**
     * Buscar una publicación por su id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar una publicación
     */
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdatePublicacionDto
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizar parcialmente una publicación
     */
    @Patch(':id')
    patch(
        @Param('id') id: string,
        @Body() dto: UpdatePublicacionDto
    ) {
        
        const updateData = {
            ...dto,
            ...(dto.usuario_id ? { usuario_id: new Types.ObjectId(dto.usuario_id as any) } : {})
        };

        return this.service.partialUpdate(id, updateData as any);
    }

    /**
     * Eliminar una publicación (soft delete)
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    /**
     * Restaurar una publicación eliminada
     */
    @Patch(':id/restore')
    async restore(@Param('id') id: string) {
        return await this.service.restore(id);
    }
}