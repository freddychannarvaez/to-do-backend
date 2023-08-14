import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { ListModule } from './list/list.module';
import { Note } from './note/entities/note.entity';
import { List } from './list/entities/list.entity';

@Module({
  imports: [
    // DB Setup
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todoDB',
      entities: [Note, List],
      synchronize: true,
    }),
    NoteModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
