import { IsString } from 'class-validator';

export class CreateRequestDto {
    @IsString()
    eventId: string;

    @IsString()
    rewardId: string;

    @IsString()
    userId: string;
}
