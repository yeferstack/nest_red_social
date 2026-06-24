import { PartialType } from '@nestjs/swagger';
import { CreateSeguidorDto } from './create-seguidor.dto';

/**
 * DTO para actualizar un seguidor
 * PartialType
 */

export class UpdateSeguidorDto extends PartialType(
    CreateSeguidorDto
) {}
