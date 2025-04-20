import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { Summary } from './entities/summary.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Get()
  getSummaries(@Query('take') take?: number) {
    return this.summariesService.findAll(take);
  }

  @Get(':id')
  getSummary(@Param('id') id: number) {
    return this.summariesService.findOne(id);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.summariesService.remove(Number(id));
  }
}
