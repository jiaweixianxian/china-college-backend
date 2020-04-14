import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './college.entity';
import * as moment from 'moment';
import * as Crawler from 'crawler';
import { ParamCrawler } from './param-crawler.enum';


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

  findAll(condition: Object): Promise<College[]> {
    return this.collegeRepository.find({
      where: condition
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
      return new Promise((reslove, reject) => {
        var c = new Crawler({
          maxConnections: 10,
          callback: (error, res, done) => {
            if (error) {
              console.log(error);
              reject(error)
            } else {
              var $ = res.$;
              let items = [];
              $('.table-x').find('tbody').find('tr').each(async (idx, element) => {
                if (idx === 0 || idx === 1) { return; }
                var $element = $(element);
                let collegeListInfo = {
                  name: $element.find('td').eq(1).text(),
                  location: $element.find('td').eq(4).text(),
                  provinceAbbr: province,
                  create_ts: moment().format('YYYY-MM-DD HH:mm:ss')
                }
                let basicInfo = await this.crawlerCollegeInfo(collegeListInfo.name);
                const college = Object.assign(collegeListInfo, basicInfo);
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
    return await a();
  }

  async crawlerCollegeInfo(collegeName) {
    const crawlerFun = (collegeName: String) => {
      return new Promise((reslove, reject) => {
        var c = new Crawler({
          maxConnections: 10,
          callback: (error, res, done) => {
            if (error) {
              reject(error)
            } else {
              const $ = res.$;
              let collegeBasicInfo: College = new College;
              $('.lemma-summary').find('.para').each((index, element) => {
                const $element = $(element);
                collegeBasicInfo.des = collegeBasicInfo.des + $element.text() + '\n';
              });
              collegeBasicInfo.website = $('.baseBox').find('.dl-baseinfo').last().find('dl').last().find('dd').find('a').text();
              let allParamsElement = $('.basic-info').find('dt');
              allParamsElement.each((index, element) => {
                const $element = $(element);
                const labelTitle = $element.text().replace(/\s+/g, "");
                for (const key in ParamCrawler) {
                  if (labelTitle === ParamCrawler[key]) {
                    if (key === 'createdYear') {
                      collegeBasicInfo.createdYear = $element.next().text().substr(0,5);
                    } else if (key === 'tags') {
                      let originTags = $element.next().text();
                      originTags = originTags.replace(new RegExp(/收起/, 'gi'), "");
                      if (originTags.charAt(0) == "\n") originTags = originTags.substr(1);
                      if (originTags.charAt(originTags.length - 1) == "\n") originTags = originTags.substr(0, originTags.length - 2);
                      originTags = originTags.replace(new RegExp('\n\n', 'gi'), '\n');
                      collegeBasicInfo[key] = originTags.replace(new RegExp('\n', 'gi'), ',');
                    } else if (key === 'schoolFellow') {
                      let originTags = $element.next().text();
                      originTags = originTags.replace(new RegExp('、', 'gi'), ",");
                      let index = originTags.indexOf('等');
                      originTags = originTags.substr(0, index);
                      collegeBasicInfo[key] = originTags.replace(/[\r\n]/g, "");
                    }
                    else {
                      collegeBasicInfo[key] = $element.next().text().replace(/[\r\n]/g, "");
                    }
                  }
                }
              })
              reslove(collegeBasicInfo);
            }
            done();
          }
        });
        c.queue(
          {
            uri: `https://baike.baidu.com/item/${collegeName}`,
            headers: {
              'accept-encoding': 'br'
            }
          }
        );
      })
    };
    return await crawlerFun(encodeURIComponent(collegeName));

  }



}