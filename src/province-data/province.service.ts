import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Crawler from 'crawler';
import { Province } from './province.entity';

@Injectable()
export class ProvinceService {
    constructor(
        @InjectRepository(Province)
        private provinceRepository: Repository<Province>,
    ) {
    }

    listProvince(): Promise<Province[]> {
        return this.provinceRepository.find();
    }
    async crawlerProvince() {
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
                            $('.row').find('.col-md-12').find('.row').find('.col-md-12').find('a').each(async (idx, element) => {
                                if (idx >= 34) { return; }
                                var $element = $(element);
                                let province = {
                                    name: $element.text(),
                                }
                                await this.provinceRepository.save(province);
                                items.push(province);
                            });
                            reslove(items);

                        }
                        done();
                    }
                });
                c.queue(`http://www.52maps.com/china_city.php`);

            })
        };
        return await a();
    }

}