import {
    IsMongoId,
    IsNotEmpty,
} from 'class-validator';

import {
    ApiProperty,
} from '@nestjs/swagger';

export class CreateSeguidorDto {
    @ApiProperty({
        description: 'ID del usuario que sigue',
        example: '665f1a2b3c4d5e6f7a8b9c0d',
    })
    @IsMongoId()
    @IsNotEmpty()
    seguidor_id!: string;

    @ApiProperty({
        description: 'ID del usuario que es seguido',
        example: '665f1a2b3c4d5e6f7a8b9c0e',
    })
    @IsMongoId()
    @IsNotEmpty()
    seguido_id!: string;
}
