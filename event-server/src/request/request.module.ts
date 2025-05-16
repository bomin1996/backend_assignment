import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RewardRequest, RequestSchema } from './schemas/request.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RewardRequest.name, schema: RequestSchema }]),
    ],
    controllers: [RequestController],
    providers: [RequestService],
})
export class RequestModule {}
