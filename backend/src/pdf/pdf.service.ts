import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class PdfService {
  async extractTextFromPdf(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);

      return data.text as string;
    } catch (error) {
      throw new Error(`PDF parsing error: ${error.message}`);
    }
  }
}
