import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from '../../event/schemas/event.schema';
import { Reward } from '../../reward/schemas/reward.schema';

@Schema()
export class RewardRequest {
    @Prop({ required: true })
    userId: string;

    @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Reward.name, required: true })
    rewardId: Types.ObjectId;
}

export type RequestDocument = RewardRequest & Document;
export const RequestSchema = SchemaFactory.createForClass(RewardRequest);
