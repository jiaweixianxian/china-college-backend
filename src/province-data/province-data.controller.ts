import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Province } from './province.entity';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
    constructor(private readonly provinceService: ProvinceService) {
    }
    @Post('crawler')
    crawlerProvince() {
        return this.provinceService.crawlerProvince();
    }

    @Get()
    list(): Promise<Province[]> {
        return this.provinceService.listProvince();
    }


}