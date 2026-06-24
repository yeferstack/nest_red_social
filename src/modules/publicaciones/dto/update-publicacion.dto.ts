import { PartialType } from '@nestjs/swagger';
import { CreatePublicacionDto } from './create-publicacion.dto';

/**
 * DTO para actualizar una publicación
 * PartialType - todos los campos son opcionales
 */
export class UpdatePublicacionDto extends PartialType(
    CreatePublicacionDto
) {}
