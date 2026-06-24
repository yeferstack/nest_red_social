import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePublicacionDto {
    @ApiProperty({
        description: 'ID del usuario que crea la publicación',
        example: '60d5ec49c1234567890abcde',
    })
    @IsString()
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        description: 'Contenido de la publicación',
        example: 'Este es mi primer post en la red social',
    })
    @IsString()
    @IsNotEmpty()
    contenido!: string;

    @ApiProperty({
        description: 'URL de la imagen (opcional)',
        example: 'https://example.com/image.jpg',
        required: false,
    })
    @IsString()
    @IsOptional()
    imagen?: string;
}
