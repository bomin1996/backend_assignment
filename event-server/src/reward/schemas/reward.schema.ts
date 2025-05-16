import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string; // 예: '포인트', '아이템', '쿠폰'

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
    eventId: Types.ObjectId;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
