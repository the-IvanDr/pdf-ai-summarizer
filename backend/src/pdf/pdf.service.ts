import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as pdfParse from 'pdf-parse';
import { Injectable } from '@nestjs/common';

const FILES_DIRECTORY = path.join(__dirname, '../../public/files');

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

  saveFileInPublicDirectory(file: Express.Multer.File): string {
    if (!fs.existsSync(FILES_DIRECTORY)) {
      fs.mkdirSync(FILES_DIRECTORY, { recursive: true });
    }

    const fileExt = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExt}`;
    const filePath = path.join(FILES_DIRECTORY, uniqueFilename);

    fs.writeFileSync(filePath, file.buffer);

    return uniqueFilename;
  }
}
