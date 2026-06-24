import { Controller, Get, Post, Body, Param, Put, Patch, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { SearchSeguidorDto } from './dto/search-seguidor.dto';

@ApiTags('Seguidores')
@Controller('seguidores')
export class SeguidoresController {
    constructor(
        private readonly service: SeguidoresService,
    ) {}

    /**
     * Crear un seguidor
     */
    @Post()
    create(@Body() dto: CreateSeguidorDto) {
        return this.service.create(dto);
    }

    /**
     * Consultar seguidores activos
     */
    @Get()
    findAll(@Query() search: SearchSeguidorDto) {
        return this.service.findAll(search);
    }

    /**
     * Consultar seguidores inactivos
     */
    @Get('inactivos')
    findInactive() {
        return this.service.findInactive();
    }

    /**
     * Buscar un seguidor por su id
     */
    @Get(':id')
    findOne(
        @Param('id')
        id: string
    ) {
        return this.service.findOne(id);
    }

    /**
     * Actualizar un seguidor
     */
    @Put(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateSeguidorDto
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizar parcialmente un seguidor
     */
    @Patch(':id')
    patch(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateSeguidorDto
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
     * Restaurar seguidor eliminado
     */
    @Patch(':id/restore')
    async restore(
        @Param('id')
        id: string
    ) {
        return await this.service.restore(id);
    }
}
