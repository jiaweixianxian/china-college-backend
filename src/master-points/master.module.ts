import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPoints } from './master.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterPoints])
  ],
  providers: [],
  controllers: [],
})
export class MasterPointsModule {}