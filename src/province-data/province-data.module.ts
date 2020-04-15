import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { ProvinceController } from './province-data.controller';
import { ProvinceService } from './province.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Province]),
  ],
  controllers:[ProvinceController],
  providers:[ProvinceService]
})
export class ProvinceModule {}