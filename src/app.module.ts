import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestModule } from './apis/best/best.module';

@Module({
  imports: [BestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
