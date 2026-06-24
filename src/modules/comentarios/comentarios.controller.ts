import { Controller, Get, Post, Body, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { SearchComentarioDto } from './dto/search-comentario.dto';
 
@ApiTags('Comentarios')
@Controller('comentarios')
export class ComentariosController {
    constructor(
        private readonly service: ComentariosService,
    ) {}
 
    /**
     * Crear un nuevo comentario
     */
    @Post()
    create(@Body() dto: CreateComentarioDto) {
        return this.service.create(dto);
    }
 
    /**
     * Obtener todos los comentarios activos
     */
    @Get()
    findAll(@Query() search: SearchComentarioDto) {
        return this.service.findAll(search);
    }
 
    /**
     * Obtener comentarios inactivos
     */
    @Get('inactivos')
    findInactive() {
        return this.service.findInactive();
    }
 
    /**
     * Obtener comentarios de una publicación
     */
    @Get('publicacion/:publicacion_id')
    findByPublicacion(
        @Param('publicacion_id') publicacion_id: string,
        @Query() search: SearchComentarioDto,
    ) {
        return this.service.findByPublicacion(publicacion_id, search);
    }
 
    /**
     * Buscar un comentario por su id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }
 
    /**
     * Actualizar un comentario
     */
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateComentarioDto
    ) {
        return this.service.update(id, dto);
    }
 
    /**
     * Actualizar parcialmente un comentario
     */
    @Patch(':id')
    patch(
        @Param('id') id: string,
        @Body() dto: UpdateComentarioDto
    ) {
        return this.service.partialUpdate(id, dto);
    }
 
    /**
     * Eliminar un comentario (soft delete)
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
 
    /**
     * Restaurar un comentario eliminado
     */
    @Patch(':id/restore')
    async restore(@Param('id') id: string) {
        return await this.service.restore(id);
    }
}