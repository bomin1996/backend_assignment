import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateEventDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsBoolean()
    isActive: boolean;
}
