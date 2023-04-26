import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestModule } from './apis/best/best.module';
import { CrawlersService } from './apis/crawlers/crawlers.service';

@Module({
  imports: [BestModule],
  controllers: [AppController],
  providers: [AppService, CrawlersService],
})
export class AppModule {}
