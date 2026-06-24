import { Controller, Get, Post, Body, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReaccionesService } from './reacciones.service';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { SearchReaccionDto } from './dto/search-reaccion.dto';

@ApiTags('Reacciones')
@Controller('reacciones')
export class ReaccionesController {
    constructor(
        private readonly service: ReaccionesService,
    ) {}

    /**
     * Crear una reaccion
     */
    @Post()
    create(@Body() dto: CreateReaccionDto) {
        return this.service.create(dto);
    }

    /**
     * Consultar reacciones activas
     */
    @Get()
    findAll(@Query() search: SearchReaccionDto) {
        return this.service.findAll(search);
    }

    /**
     * Consultar reacciones inactivas
     */
    @Get('inactivos')
    findInactive() {
        return this.service.findInactive();
    }

    /**
     * Buscar una reaccion por su id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string
    ) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar una reaccion
     */
    @Put(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateReaccionDto
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizar parcialmente una reaccion
     */
    @Patch(':id')
    patch(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateReaccionDto
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Eliminacion logica
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    /**
     * Restaurar reaccion eliminada
     */
    @Patch(':id/restore')
    async restore(
        @Param('id')
        id: string
    ) {
        return await this.service.restore(id);
    }
}
