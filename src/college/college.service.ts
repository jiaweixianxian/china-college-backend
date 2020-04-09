import { Injectable,HttpException ,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College} from './college.entity';
import { CreateCollegeDto } from './dto/create-college.dto';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private collegeRepository: Repository<College>,
  ) {
  }

  create(createCollegeDto: CreateCollegeDto): Promise<College> {
    return this.collegeRepository.save(createCollegeDto);
  }

  async update(id,createCollegeDto: CreateCollegeDto):Promise<void>{
    await this.checkCollegeExist(id);
    await this.collegeRepository.update(id,createCollegeDto);
  }

  findAll(): Promise<College[]> {
    return this.collegeRepository.find();
  }

  async findOne(id: string): Promise<College> {
    await this.checkCollegeExist(id);
    return this.collegeRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkCollegeExist(id);
    await this.collegeRepository.delete(id);
  }

  async checkCollegeExist(collegeId){
    try {
      await this.collegeRepository.findOneOrFail(collegeId);
    }
    catch (e) {
      throw new HttpException({
        status: 'COLLEGE_NOT_FOUND',
        error: 'Not found the college',
      }, HttpStatus.OK);
    }
  }



}