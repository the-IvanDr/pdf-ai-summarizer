import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';
import { SummariesController } from './summaries.controller';
import { SummariesService } from './summaries.service';
import { OpenaiModule } from 'src/openai/openai.module';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [TypeOrmModule.forFeature([Summary]), OpenaiModule, PdfModule],
  controllers: [SummariesController],
  providers: [SummariesService],
})
export class SummariesModule {}
