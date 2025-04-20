import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';
import { SummariesController } from './summaries.controller';
import { SummariesService } from './summaries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Summary])],
  controllers: [SummariesController],
  providers: [SummariesService],
})
export class SummariesModule {}
