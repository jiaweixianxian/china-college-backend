import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BachelorService } from './bachelor.service';
import { BachelorController } from './bachelor.controller';
import { BachelorPoints } from './bachelor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BachelorPoints])
  ],
  providers: [BachelorService],
  controllers: [BachelorController],
})
export class BachelorPointsModule {}