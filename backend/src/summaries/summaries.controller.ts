import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { Summary } from './entities/summary.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File): Promise<Summary> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }

    return this.summariesService.create(file);
  }

  @Get(':id')
  getSummary(@Param('id') id: string) {
    return { summaryId: id };
  }

  @Get()
  getSummaries() {}

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.summariesService.remove(Number(id));
  }
}
