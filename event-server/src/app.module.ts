import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/event-db'),
    EventModule,
  ],
})
export class AppModule {}
