import { Module } from '@nestjs/common';
import { ReaccionesController } from './reacciones.controller';
import { ReaccionesService } from './reacciones.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaccion, ReaccionSchema } from './schemas/reaccion.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Reaccion.name,
                schema: ReaccionSchema,
            }
        ]),
    ],
    controllers: [ReaccionesController],
    providers: [ReaccionesService],
})
export class ReaccionesModule {}
