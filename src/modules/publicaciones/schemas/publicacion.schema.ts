import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

/**
 * Colección de publicaciones
 */
@Schema({
    timestamps: true,
})
export class Publicacion {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuario_id!: Types.ObjectId;

    @Prop({
        required: true,
    })
    contenido!: string;

    @Prop()
    imagen?: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

PublicacionSchema.index({ usuario_id: 1 });
PublicacionSchema.index({ createdAt: -1 });
