import { IsOptional } from 'class-validator';
 
export class SearchComentarioDto {
    @IsOptional()
    usuario_id?: string;
 
    @IsOptional()
    publicacion_id?: string;
 
    @IsOptional()
    contenido?: string;
 
    @IsOptional()
    page?: number;
 
    @IsOptional()
    limit?: number;
}
 