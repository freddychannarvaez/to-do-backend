import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'todoDB',
      entities: [],
      synchronize: true,
    }),
    NoteModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
