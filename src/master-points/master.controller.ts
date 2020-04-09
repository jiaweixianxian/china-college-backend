import { Body, Controller, Delete, Get, Param, Post ,Put} from '@nestjs/common';
import { MasterPoints } from './master.entity';
import { CreateMasterPointsDto } from './dto/create-master-points.dto';
import { MasterService } from './master.service';

@Controller('master-points')
export class MasterController {
  constructor(private readonly masterService: MasterService) {
  }

  @Post()
  create(@Body() createMasterPointsDto:CreateMasterPointsDto ): Promise<MasterPoints> {
    return this.masterService.create(createMasterPointsDto);
  }

  @Get()
  findAll(): Promise<MasterPoints[]> {
    return this.masterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MasterPoints> {
    return this.masterService.findOne(id);
  }

  @Put(":id")
  update(@Param('id') id: string, @Body()  createMasterPointsDto:CreateMasterPointsDto) :Promise<void>{
    return this.masterService.update(id,createMasterPointsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.masterService.remove(id);
  }

}
