import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Post()
    create(@Body() dto: CreateRequestDto) {
        return this.requestService.create(dto);
    }

    @Get()
    findAll() {
        return this.requestService.findAll();
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.requestService.findByUser(userId);
    }
}
