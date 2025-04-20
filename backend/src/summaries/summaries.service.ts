import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';
import { PdfService } from 'src/pdf/pdf.service';
import { OpenAIService, SummaryResult } from 'src/openai/openai.service';

@Injectable()
export class SummariesService {
  constructor(
    @InjectRepository(Summary)
    private summariesRepository: Repository<Summary>,

    private readonly pdfService: PdfService,
    private readonly openAIService: OpenAIService,
  ) {}

  findAll(take?: number): Promise<Summary[]> {
    return this.summariesRepository.find({ take });
  }

  findOne(id: number): Promise<Summary | null> {
    return this.summariesRepository.findOne({ where: { id } });
  }

  async create(file: Express.Multer.File): Promise<Summary> {
    const fileSummary = await this.createSummaryFromPdf(file);

    return this.summariesRepository.save({
      file: 'filePath',
      title: fileSummary.title,
      text: fileSummary.summary,
    });
  }

  async remove(id: number): Promise<void> {
    await this.summariesRepository.delete(id);
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
      throw new Error(`Summary creation failed: ${error.message}`);
    }
  }
}
