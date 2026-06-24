import {
    Prop,
    Schema,
    SchemaFactory,
} from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

export type SeguidorDocument = Seguidor & Document;

@Schema({
    timestamps: true,
})
export class Seguidor {
    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    seguidor_id!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    seguido_id!: Types.ObjectId;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const SeguidorSchema = SchemaFactory.createForClass(Seguidor);
