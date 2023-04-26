import { Injectable } from '@nestjs/common';
import { CreateBestDto } from './dto/create-best.dto';
import { UpdateBestDto } from './dto/update-best.dto';
import { CrawlersService } from '../crawlers/crawlers.service';

@Injectable()
export class BestService {
  constructor(private readonly crawlerService: CrawlersService) {}
  create(createBestDto: CreateBestDto) {
    return 'This action adds a new best';
  }

  async findAll() {
    const naverBestKeyword = await this.crawlerService.naverBestCrawler();
    const street11BestKeyword = await this.crawlerService.street11BestCrawler();
    return { naver: naverBestKeyword, street11: street11BestKeyword };
  }

  findOne(id: number) {
    return `This action returns a #${id} best`;
  }

  update(id: number, updateBestDto: UpdateBestDto) {
    return `This action updates a #${id} best`;
  }

  remove(id: number) {
    return `This action removes a #${id} best`;
  }
}
