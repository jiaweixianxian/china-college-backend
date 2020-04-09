import { Injectable,HttpException ,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BachelorPoints } from './bachelor.entity';
import { CreateBachelorPointsDto } from './dto/create-bachelor.dto';

@Injectable()
export class BachelorService {
  constructor(
    @InjectRepository(BachelorPoints)
    private bachelorRepository: Repository<BachelorPoints>,
  ) {
  }

  create(createBachelorPointsDto: CreateBachelorPointsDto): Promise<BachelorPoints> {
    return this.bachelorRepository.save(createBachelorPointsDto);
  }

  async update(id,createBachelorPointsDto: CreateBachelorPointsDto):Promise<void>{
    await this.checkCollegeExist(id);
    await this.bachelorRepository.update(id,createBachelorPointsDto);
  }

  findAll(): Promise<BachelorPoints[]> {
    return this.bachelorRepository.find();
  }

  async findOne(id: string): Promise<BachelorPoints> {
    await this.checkCollegeExist(id);
    return this.bachelorRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkCollegeExist(id);
    await this.bachelorRepository.delete(id);
  }

  async checkCollegeExist(collegeId){
    try {
      await this.bachelorRepository.findOneOrFail(collegeId);
    }
    catch (e) {
      throw new HttpException({
        status: 'Bachelor_NOT_FOUND',
        error: 'Not found the college',
      }, HttpStatus.OK);
    }
  }



}