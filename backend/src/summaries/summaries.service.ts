import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';

@Injectable()
export class SummariesService {
  constructor(
    @InjectRepository(Summary)
    private summariesRepository: Repository<Summary>,
  ) {}

  findAll(take?: number): Promise<Summary[]> {
    return this.summariesRepository.find({ take });
  }

  findOne(id: number): Promise<Summary | null> {
    return this.summariesRepository.findOne({ where: { id } });
  }

  async create(file: File): Promise<Summary> {
    console.log('create summary - file:', file);
    return this.summariesRepository.save({
      file: 'filePath',
      title: 'Summary Title',
      text: 'Summary Text',
    });
  }

  async remove(id: number): Promise<void> {
    await this.summariesRepository.delete(id);
  }
}
