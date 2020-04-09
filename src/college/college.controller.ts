import { Body, Controller, Delete, Get, Param, Post ,Put} from '@nestjs/common';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { College } from './college.entity';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {
  }

  @Post()
  create(@Body() createCollegeDto:CreateCollegeDto ): Promise<College> {
    return this.collegeService.create(createCollegeDto);
  }

  @Get()
  findAll(): Promise<College[]> {
    return this.collegeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<College> {
    return this.collegeService.findOne(id);
  }

  @Put(":id")
  update(@Param('id') id: string, @Body() createCollegeDto:CreateCollegeDto) :Promise<void>{
    return this.collegeService.update(id,createCollegeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.collegeService.remove(id);
  }

}
