import { Body, Controller, Delete, Get, Param, Post ,Put} from '@nestjs/common';
import { BachelorPoints } from './bachelor.entity';
import {  CreateBachelorPointsDto } from './dto/create-bachelor.dto';
import { BachelorService } from './bachelor.service';

@Controller('bachelor-points')
export class BachelorController {
  constructor(private readonly bachelorPointService: BachelorService) {
  }

  @Post()
  create(@Body() createBachelorPointsDto:CreateBachelorPointsDto ): Promise<BachelorPoints> {
    return this.bachelorPointService.create(createBachelorPointsDto);
  }

  @Get()
  findAll(): Promise<BachelorPoints[]> {
    return this.bachelorPointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BachelorPoints> {
    return this.bachelorPointService.findOne(id);
  }

  @Put(":id")
  update(@Param('id') id: string, @Body() createBachelorPointsDto:CreateBachelorPointsDto) :Promise<void>{
    return this.bachelorPointService.update(id,createBachelorPointsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bachelorPointService.remove(id);
  }

}
