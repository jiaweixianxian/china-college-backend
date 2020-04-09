import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPoints } from './master.entity';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterPoints])
  ],
  providers: [MasterService],
  controllers: [MasterController],
})
export class MasterPointsModule {}