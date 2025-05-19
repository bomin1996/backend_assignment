import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    ) {}

    async create(dto: CreateEventDto): Promise<Event> {
        return this.eventModel.create(dto);
    }

    async findAll(): Promise<Event[]> {
        return this.eventModel.find();
    }

    async findOne(id: string): Promise<Event> {
        const event = await this.eventModel.findById(id);
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async update(id: string, dto: UpdateEventDto): Promise<Event> {
        const updated = await this.eventModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!updated) throw new NotFoundException('Event not found');
        return updated;
    }

    async disable(id: string): Promise<Event> {
        const disabled = await this.eventModel.findByIdAndUpdate(
            id,
            { disabled: true },
            { new: true },
        );
        if (!disabled) throw new NotFoundException('Event not found');
        return disabled;
    }
}
