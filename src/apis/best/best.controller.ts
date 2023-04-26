import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { BestService } from './best.service';
import { CreateBestDto } from './dto/create-best.dto';
import { UpdateBestDto } from './dto/update-best.dto';

@Controller('best')
export class BestController {
  constructor(private readonly bestService: BestService) {}

  @Post()
  create(@Body() createBestDto: CreateBestDto) {
    return this.bestService.create(createBestDto);
  }

  @Get()
  @Render('best')
  async findAll() {
    let data = await this.bestService.findAll();
    data = [
      { keyword: 'aaa', rank: 1 },
      { keyword: 'bbb', rank: 2 },
    ];
    return { data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBestDto: UpdateBestDto) {
    return this.bestService.update(+id, updateBestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bestService.remove(+id);
  }
}
