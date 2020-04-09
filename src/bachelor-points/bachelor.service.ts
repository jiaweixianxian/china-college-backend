import { Injectable,HttpException ,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BachelorPoints } from './bachelor.entity';
import { CreateBachelorPointsDto } from './dto/create-bachelor.dto';

@Injectable()
export class BachelorService {
  constructor(
    @InjectRepository(BachelorPoints)
    private createBachelorPointsDto: Repository<BachelorPoints>,
  ) {
  }

  create(createBachelorPointsDto: CreateBachelorPointsDto): Promise<BachelorPoints> {
    return this.createBachelorPointsDto.save(createBachelorPointsDto);
  }

  async update(id,createBachelorPointsDto: CreateBachelorPointsDto):Promise<void>{
    await this.checkCollegeExist(id);
    await this.createBachelorPointsDto.update(id,createBachelorPointsDto);
  }

  findAll(): Promise<BachelorPoints[]> {
    return this.createBachelorPointsDto.find();
  }

  async findOne(id: string): Promise<BachelorPoints> {
    await this.checkCollegeExist(id);
    return this.createBachelorPointsDto.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkCollegeExist(id);
    await this.createBachelorPointsDto.delete(id);
  }

  async checkCollegeExist(collegeId){
    try {
      await this.createBachelorPointsDto.findOneOrFail(collegeId);
    }
    catch (e) {
      throw new HttpException({
        status: 'Bachelor_NOT_FOUND',
        error: 'Not found the college',
      }, HttpStatus.OK);
    }
  }



}