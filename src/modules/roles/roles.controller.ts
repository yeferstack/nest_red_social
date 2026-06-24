import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly service: RolesService,
    ) {}

    /** * crear un rol 
     */
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.service.create(dto);
    }

    /**
     * consultar roles
     */
    @Get()
    findAll() {
        return this.service.findAll();
    }

    /**
     * Consultar roles inactivos
     */
    @Get('inactivos')
    findInactive() {
        return this.service.findInactive();
    }

    /**
     * buscar un rol por su id
     */
    @Get(':id')
    findOne(
        @Param('id') 
        id: string
    ) {
        return this.service.findOne(id);
    }

    /**
     * actualizar un rol
     */
    @Put(':id')
    update(
        @Param('id') 
        id: string,
        
        @Body() 
        dto: UpdateRoleDto
    ) {
        return this.service.update(id, dto);
    }

    /**
     * Actualizar parcialmente un rol
     */
    @Patch(':id')
    patch(
        @Param('id') 
        id: string,
        
        @Body() 
        dto: UpdateRoleDto
    ) {
        return this.service.update(id, dto);
    }

    /**
     * eliminar un rol
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    /**
     * Restaurar rol eliminado 
     */
    @Patch(':id/restore')
    async restore(
        @Param('id') 
        id: string
    ) {
        return await this.service.restore(id);
    }
}