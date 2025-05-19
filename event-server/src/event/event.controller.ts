import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    create(@Body() dto: CreateEventDto) {
        return this.eventService.create(dto);
    }

    @Get()
    findAll() {
        return this.eventService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
        return this.eventService.update(id, dto);
    }

    @Patch(':id/disable')
    disable(@Param('id') id: string) {
        return this.eventService.disable(id);
    }
}
