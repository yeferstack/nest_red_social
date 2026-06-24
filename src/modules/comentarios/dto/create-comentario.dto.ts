import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
 
export class CreateComentarioDto {
    @ApiProperty({
        description: 'ID del usuario que crea el comentario',
        example: '60d5ec49c1234567890abcde',
    })
    @IsString()
    @IsNotEmpty()
    usuario_id!: string;
 
    @ApiProperty({
        description: 'ID de la publicación que se comenta',
        example: '60d5ec49c1234567890abcde',
    })
    @IsString()
    @IsNotEmpty()
    publicacion_id!: string;
 
    @ApiProperty({
        description: 'Contenido del comentario',
        example: 'Excelente post, muy buena información',
    })
    @IsString()
    @IsNotEmpty()
    contenido!: string;
}