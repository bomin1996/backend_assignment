import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    ) {}

    async create(dto: CreateRewardDto): Promise<Reward> {
        return new this.rewardModel(dto).save();
    }

    async findAll(): Promise<Reward[]> {
        return this.rewardModel.find().populate('eventId').exec();
    }
}
