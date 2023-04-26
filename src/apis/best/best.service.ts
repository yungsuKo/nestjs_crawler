import { Injectable } from '@nestjs/common';
import { CreateBestDto } from './dto/create-best.dto';
import { UpdateBestDto } from './dto/update-best.dto';
import cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class BestService {
  create(createBestDto: CreateBestDto) {
    return 'This action adds a new best';
  }

  async findAll() {
    const url =
      'https://search.shopping.naver.com/best/category/keyword?categoryCategoryId=ALL&categoryDemo=A00&categoryRootCategoryId=ALL&chartRank=1&period=P1D';
    const naverHtml = await axios.get(url);
    const $ = cheerio.load(naverHtml.data);

    $(
      '#container > div > div > div > div.category_panel > div > ul > li > a',
    ).each((i, elem) => {
      console.log(i);
      console.log($(elem).html());
    });

    return [];
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
