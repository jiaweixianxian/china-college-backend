import { Body, Controller, Delete, Get, Param, Post ,Put} from '@nestjs/common';
import { CollegeService } from './college.service';
import { College } from './college.entity';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {
  }

  @Post('create')
  create(@Body() createCollege:College ): Promise<College> {
    return this.collegeService.create(createCollege);
  }

  @Post('list')
  findAll(@Body() condition:Object): Promise<College[]> {
    console.log(condition);
    
    return this.collegeService.findAll(condition);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string): Promise<College> {
    return this.collegeService.findOne(id);
  }

  @Put(":id")
  update(@Param('id') id: string, @Body() updateCollege:College) :Promise<void>{
    return this.collegeService.update(id,updateCollege);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.collegeService.remove(id);
  }

  @Post('crawler/:province')
  reptile(@Param('province') province: string) {
    return this.collegeService.crawlerCollegeaNameByProvince(province);
  }

}
