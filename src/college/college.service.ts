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

  async checkCollegeExist(collegeId):Promise<void> {
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

  async reptile(){
    const result=await this.list();
    console.log(result);
    
     return await this.list();
  }

  async list() {

    const a = () => {
      return new Promise(function (reslove, reject) {
        var c = new Crawler({
          maxConnections: 10,
          // This will be called for each crawled page
          callback: function (error, res, done) {
            if (error) {
              console.log(error);
              reject(error)
            } else {
              var $ = res.$;
              let items = [];
              $('.scores_List').find('dl').each(async function (idx, element) {
                var $element = $(element);

                let location= $element.find('dd').find('ul').find('li').first().text();
                let website=$element.find('dd').find('ul').find('li').last().text();
                let college={
                  logo_url:$element.find('dt').find('a').find('img').attr('src'),
                  name:$element.find('dt').find('strong').text(),
                  location:location.split(/[, ， 、 ; ：\s+]/)[1],
                  website:website.split(/[, ， 、 ; ：\s+]/)[1],
                }
                if(idx===0){
                  let resultFromBaidu=await detail(encodeURIComponent(college.name));
                  Object.assign(college,resultFromBaidu);
                }
                items.push(college);
              });

              console.log(items);
              
              reslove(items);
            }
            done();
          }
        });
        c.queue('http://college.gaokao.com/schlist/a1/p1');

      })
    };

    const detail=(collegeName)=>{
       return new Promise( (resolve:Function,reject:Function) =>{
        const queryBaidu=new Crawler({
          maxConnections: 10,
          callback: function (error, res, done) {
            if (error) {
              console.log(error);
              reject(error)
            } else {
              var $ = res.$;
              let item= {};
              var $element = $('.basicInfo-left');

              item={
                created_year:$element.find('dd').eq('3').text(),
                type:$element.find('dd').eq('4').text(),
                department:$element.find('dd').eq('7').text(),

              };
             

              console.log(item);
              
              resolve(item);
            }
            done();
          }
        });
        queryBaidu.queue(`https://baike.baidu.com/item/${collegeName}`);
       });

    };
    return  await a()
  }



}