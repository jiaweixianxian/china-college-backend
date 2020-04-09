import { Injectable,HttpException ,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterPoints } from './master.entity';
import { CreateMasterPointsDto } from './dto/create-master-points.dto';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(MasterPoints)
    private createMasterRepository: Repository<MasterPoints>,
  ) {
  }

  create(createMasterPointsDto:CreateMasterPointsDto): Promise<MasterPoints> {
    return this.createMasterRepository.save(createMasterPointsDto);
  }

  async update(id,createMasterPointsDto:CreateMasterPointsDto):Promise<void>{
    await this.checkCollegeExist(id);
    await this.createMasterRepository.update(id,createMasterPointsDto);
  }

  findAll(): Promise<MasterPoints[]> {
    return this.createMasterRepository.find();
  }

  async findOne(id: string): Promise<MasterPoints> {
    await this.checkCollegeExist(id);
    return this.createMasterRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkCollegeExist(id);
    await this.createMasterRepository.delete(id);
  }

  async checkCollegeExist(collegeId){
    try {
      await this.createMasterRepository.findOneOrFail(collegeId);
    }
    catch (e) {
      throw new HttpException({
        status: 'Master_NOT_FOUND',
        error: 'Not found the college',
      }, HttpStatus.OK);
    }
  }



}