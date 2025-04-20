import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfService } from 'src/pdf/pdf.service';
import { OpenAIService, SummaryResult } from 'src/openai/openai.service';
import { Summary } from './entities/summary.entity';

@Injectable()
export class SummariesService {
  constructor(
    @InjectRepository(Summary)
    private summariesRepository: Repository<Summary>,

    private readonly pdfService: PdfService,
    private readonly openAIService: OpenAIService,
  ) {}

  findAll(take?: number): Promise<Summary[]> {
    return this.summariesRepository.find({ take, order: { id: 'DESC' } });
  }

  findOne(id: number): Promise<Summary | null> {
    return this.summariesRepository.findOne({ where: { id } });
  }

  async create(file: Express.Multer.File): Promise<Summary> {
    const fileSummary = await this.createSummaryFromPdf(file);

    const savedFileName = this.pdfService.saveFileInPublicDirectory(file);

    return this.summariesRepository.save({
      file: savedFileName,
      title: fileSummary.title,
      text: fileSummary.summary,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.summariesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Summary with ID ${id} not found`);
    }
  }

  async createSummaryFromPdf(
    pdfFile: Express.Multer.File,
  ): Promise<SummaryResult> {
    try {
      const text = await this.pdfService.extractTextFromPdf(pdfFile.buffer);

      if (!text) {
        throw new Error('Failed to extract text from PDF');
      }

      return await this.openAIService.summarizeText(text);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
