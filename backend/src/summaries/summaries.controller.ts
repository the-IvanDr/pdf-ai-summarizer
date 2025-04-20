import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { Summary } from './entities/summary.entity';
import { SummaryCreateDto } from './dto/summary.create.dto';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  create(@Body() createDto: SummaryCreateDto): Promise<Summary> {
    return this.summariesService.create(createDto.file);
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
