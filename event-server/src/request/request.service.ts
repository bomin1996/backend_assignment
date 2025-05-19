import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardRequest, RequestDocument } from './schemas/request.schema';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestService {
    constructor(
        @InjectModel(RewardRequest.name)
        private requestModel: Model<RequestDocument>,
    ) {}

    async create(dto: CreateRequestDto): Promise<RewardRequest> {
        const existing = await this.requestModel.findOne({
            userId: dto.userId,
            eventId: dto.eventId,
            rewardId: dto.rewardId,
        });

        if (existing) {
            throw new Error('이미 요청한 보상입니다.');
        }

        return new this.requestModel(dto).save();
    }

    async findAll(): Promise<RewardRequest[]> {
        return this.requestModel.find().populate('eventId rewardId').exec();
    }

    async findByUser(userId: string): Promise<RewardRequest[]> {
        return this.requestModel.find({ userId }).populate('eventId rewardId').exec();
    }
}
