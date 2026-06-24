import { IsOptional } from 'class-validator';

export class SearchSeguidorDto {
    @IsOptional()
    seguidor_id?: string;

    @IsOptional()
    seguido_id?: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;
}
