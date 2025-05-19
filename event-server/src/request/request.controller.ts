import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Post()
    async create(@Body() dto: CreateRequestDto) {
        try {
            return await this.requestService.create(dto);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll() {
        return this.requestService.findAll();
    }

    @Get('user/:userId')
    async findByUser(@Param('userId') userId: string) {
        return this.requestService.findByUser(userId);
    }
}
