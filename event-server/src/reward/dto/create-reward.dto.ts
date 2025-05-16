import { IsString, IsNumber } from 'class-validator';

export class CreateRewardDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsNumber()
    quantity: number;

    @IsString()
    eventId: string;
}
