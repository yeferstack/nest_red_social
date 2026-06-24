import { PartialType } from '@nestjs/swagger';
import { CreateComentarioDto } from './create-comentario.dto';
 
/**
 * DTO para actualizar un comentario
 * PartialType - todos los campos son opcionales
 */
export class UpdateComentarioDto extends PartialType(
    CreateComentarioDto
) {}
 