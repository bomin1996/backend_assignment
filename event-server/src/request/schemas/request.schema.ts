import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RequestDocument = RewardRequest & Document;

@Schema({ timestamps: true })
export class RewardRequest {
    @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Reward', required: true })
    rewardId: Types.ObjectId;

    @Prop({ required: true })
    userId: string;

    @Prop({ default: 'PENDING' })
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export const RequestSchema = SchemaFactory.createForClass(RewardRequest);
