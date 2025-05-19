import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';

describe('EventService', () => {
  let service: EventService;
  let model: any;

  beforeEach(async () => {
    model = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        {
          provide: getModelToken(Event.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an event successfully', async () => {
    const eventDto = {
      title: '데일리 기프트',
      description: '매일 몬스터 300마리 처치 시 보상',
      repeatable: true,
    };

    model.create.mockResolvedValue(eventDto);
    const result = await service.create(eventDto);
    expect(result).toEqual(eventDto);
  });

  it('should disable an event', async () => {
    const event = { _id: 'abc', title: 'test', disabled: false };
    model.findByIdAndUpdate.mockResolvedValue({ ...event, disabled: true });

    const result = await service.disable('abc');
    expect(result.disabled).toBe(true);
  });
});
