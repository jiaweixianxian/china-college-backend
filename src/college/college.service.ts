import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './college.entity';
import * as moment from 'moment';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private collegeRepository: Repository<College>,
  ) {
  }

  create(createCollege: College): Promise<College> {
    createCollege.create_ts = moment().format('YYYY-MM-DD HH:mm:ss');
    return this.collegeRepository.save(createCollege);
  }

  async update(id, updateCollege: College): Promise<void> {
    updateCollege.update_ts = moment().format('YYYY-MM-DD HH:mm:ss');
    await this.collegeRepository.update(id, updateCollege);
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

  async checkCollegeExist(collegeId) {
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