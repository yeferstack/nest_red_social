import { PartialType } from '@nestjs/swagger';
import { CreateReaccionDto } from './create-reaccion.dto';

/**
 * DTO para actualizar una reaccion
 * PartialType
 */

export class UpdateReaccionDto extends PartialType(
    CreateReaccionDto
) {}
