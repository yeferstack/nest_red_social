import {
    IsMongoId,
    IsNotEmpty,
    IsString,
    IsIn,
} from 'class-validator';

import {
    ApiProperty,
} from '@nestjs/swagger';

export class CreateReaccionDto {
    @ApiProperty({
        description: 'ID del usuario que reacciona',
        example: '665f1a2b3c4d5e6f7a8b9c0d',
    })
    @IsMongoId()
    @IsNotEmpty()
    usuario_id!: string;

    @ApiProperty({
        description: 'ID de la publicacion a la que se reacciona',
        example: '665f1a2b3c4d5e6f7a8b9c0e',
    })
    @IsMongoId()
    @IsNotEmpty()
    publicacion_id!: string;

    @ApiProperty({
        description: 'Tipo de reaccion',
        enum: ['like', 'love', 'haha', 'sad', 'angry'],
        example: 'like',
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['like', 'love', 'haha', 'sad', 'angry'])
    tipo!: string;
}
