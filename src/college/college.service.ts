import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './college.entity';
import * as moment from 'moment';
import * as Crawler from 'crawler';

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
    delete updateCollege.id;
    updateCollege.update_ts = moment().format('YYYY-MM-DD HH:mm:ss');
    await this.collegeRepository.update(id, updateCollege);
  }

  findAll(condition:Object): Promise<College[]> {
    return this.collegeRepository.find({
      where:condition
    });
  }

  async findOne(id: string): Promise<College> {
    await this.checkCollegeExist(id);
    return this.collegeRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkCollegeExist(id);
    await this.collegeRepository.delete(id);
  }

  async checkCollegeExist(collegeId): Promise<void> {
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

  async crawlerCollegeaNameByProvince(province) {

    const a = () => {
      return new Promise( (reslove, reject) =>{
        var c = new Crawler({
          maxConnections: 10,
          // This will be called for each crawled page
          callback:  (error, res, done)=> {
            if (error) {
              console.log(error);
              reject(error)
            } else {
              var $ = res.$;
              let items = [];
              $('.table-x').find('tbody').find('tr').each(async (idx, element) =>{
                if(idx===0||idx===1){return;}
                var $element = $(element);
                let college = {
                  name: $element.find('td').eq(1).text(),
                  code: Number($element.find('td').eq(2).text()),
                  department: $element.find('td').eq(3).text(),
                  location: $element.find('td').eq(4).text(),
                  province_abbr:province,
                  create_ts:moment().format('YYYY-MM-DD HH:mm:ss')
                }
                await this.collegeRepository.save(college);
                items.push(college);
              });

              reslove(items);
            }
            done();
          }
        });
        c.queue(`https://daxue.eol.cn/${province}.shtml`);

      })
    };

  
    return await a()
  }



}