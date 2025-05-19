import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { RequestModule } from './request/request.module';

const isTest = process.env.NODE_ENV === 'test';

@Module({
  imports: [
    MongooseModule.forRoot(
        isTest
            ? 'mongodb://localhost:27017/event_test' // 테스트 환경용
            : 'mongodb://mongo:27017/event-db',      // 도커 내부용
    ),
    EventModule,
    RewardModule,
    RequestModule,
  ],
})
export class AppModule {}
