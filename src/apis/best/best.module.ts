import { Module } from '@nestjs/common';
import { BestService } from './best.service';
import { BestController } from './best.controller';
import { CrawlersService } from '../crawlers/crawlers.service';

@Module({
  controllers: [BestController],
  providers: [BestService, CrawlersService],
})
export class BestModule {}
