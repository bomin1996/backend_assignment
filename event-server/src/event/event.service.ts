import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    ) {}

    async create(createEventDto: CreateEventDto): Promise<Event> {
        const created = new this.eventModel(createEventDto);
        return created.save();
    }

    async findAll(): Promise<Event[]> {
        return this.eventModel.find().exec();
    }

    async update(id: string, dto: UpdateEventDto): Promise<Event> {
        return this.eventModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async disable(id: string): Promise<Event> {
        return this.eventModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
    }
}
