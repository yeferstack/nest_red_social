import { IsEmail, IsNotEmpty, IsString , MinLength, MaxLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    nombre!: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, { message: 'El correo no puede exceder los 100 caracteres' })
    correo!: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(20, { message: 'La contraseña no puede exceder los 20 caracteres' })
    password!: string;

    @ApiProperty({
        description: 'ID del rol del usuario',
    })
    @IsString()
    @IsNotEmpty()
    rol_id!: string;
}