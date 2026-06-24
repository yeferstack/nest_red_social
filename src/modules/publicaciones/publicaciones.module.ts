import { Module } from '@nestjs/common';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './schemas/publicacion.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Publicacion.name,
                schema: PublicacionSchema,
            }
        ]),
    ],
    controllers: [PublicacionesController],
    providers: [PublicacionesService],
})
export class PublicacionesModule {}
