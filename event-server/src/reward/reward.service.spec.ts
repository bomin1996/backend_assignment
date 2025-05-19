import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RewardService } from './reward.service';
import { Reward } from './schemas/reward.schema';

describe('RewardService', () => {
    let service: RewardService;
    let model: any;

    beforeEach(async () => {
        model = {
            create: jest.fn(),
            find: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RewardService,
                {
                    provide: getModelToken(Reward.name),
                    useValue: model,
                },
            ],
        }).compile();

        service = module.get<RewardService>(RewardService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a reward', async () => {
        const dto = { eventId: 'event123', day: 1, description: '주문의 흔적 500개' };
        const expected = { ...dto, _id: 'mockId' };
        model.create.mockResolvedValue(expected);

        const result = await service.create(dto);
        expect(result).toEqual(expected);
    });
});