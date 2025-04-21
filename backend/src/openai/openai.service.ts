import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface SummaryResult {
  title: string;
  summary: string;
}

@Injectable()
export class OpenAIService {
  private openai: OpenAI;
  private openaiModel: string;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });

    this.openaiModel =
      this.configService.get<string>('OPENAI_MODEL') || 'gpt-3.5-turbo-0125';
  }

  async summarizeText(text: string): Promise<SummaryResult> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.openaiModel,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that summarizes text content. Provide a short title (3-5 words) and a concise summary structured in HTML format. Respond in JSON format with "title" and "summary" keys.',
          },
          {
            role: 'user',
            content: `Summarize the following content:\n\n${text}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const result: SummaryResult = response.choices[0].message.content
        ? JSON.parse(response.choices[0].message.content)
        : null;

      if (!result) {
        throw new Error('OpenAI API returned invalid response');
      }

      return {
        title: result.title,
        summary: result.summary,
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }
}
