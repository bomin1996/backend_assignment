import { Controller, Get, Post, Body } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('reward')
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}

    @Post()
    create(@Body() dto: CreateRewardDto) {
        return this.rewardService.create(dto);
    }

    @Get()
    findAll() {
        return this.rewardService.findAll();
    }
}
