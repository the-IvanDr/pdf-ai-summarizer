import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummariesModule } from './summaries/summaries.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // or ':memory:' for in-memory database
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SummariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
