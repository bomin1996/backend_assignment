import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpProxyService } from './http.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [HttpProxyService],
})
export class AppModule {}
