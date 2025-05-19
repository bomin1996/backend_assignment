import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RequestService } from './request.service';
import { RewardRequest } from './schemas/request.schema';
import { BadRequestException } from '@nestjs/common';

describe('RequestService', () => {
    let service: RequestService;
    let model: any;

    beforeEach(async () => {
        model = {
            findOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RequestService,
                {
                    provide: getModelToken(RewardRequest.name),
                    useValue: model,
                },
            ],
        }).compile();

        service = module.get<RequestService>(RequestService);
    });

    it('should throw an error if request already exists', async () => {
        model.findOne.mockReturnValue({ exec: () => Promise.resolve({}) });
        await expect(
            service.createRequest('user123', 'event123', 'reward123'),
        ).rejects.toThrow(BadRequestException);
    });
});