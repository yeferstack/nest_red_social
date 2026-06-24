import { IsOptional } from 'class-validator';

export class SearchPublicacionDto {
    @IsOptional()
    usuario_id?: string;

    @IsOptional()
    contenido?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
