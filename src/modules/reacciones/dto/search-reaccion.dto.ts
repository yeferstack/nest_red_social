import { IsOptional } from 'class-validator';

export class SearchReaccionDto {
    @IsOptional()
    usuario_id?: string;

    @IsOptional()
    publicacion_id?: string;

    @IsOptional()
    tipo?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
