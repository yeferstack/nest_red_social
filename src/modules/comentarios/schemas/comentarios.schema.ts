import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
 
export type ComentarioDocument = Comentario & Document;
 
/**
 * Colección de comentarios
 */
@Schema({
    timestamps: true,
})
export class Comentario {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    usuario_id!: Types.ObjectId;
 
    @Prop({
        type: Types.ObjectId,
        ref: 'Publicacion',
        required: true,
    })
    publicacion_id!: Types.ObjectId;
 
    @Prop({
        required: true,
    })
    contenido!: string;
 
    @Prop({
        default: true,
    })
    activo!: boolean;
}
 
export const ComentarioSchema = SchemaFactory.createForClass(Comentario);
 
ComentarioSchema.index({ usuario_id: 1 });
ComentarioSchema.index({ publicacion_id: 1 });
ComentarioSchema.index({ createdAt: -1 });