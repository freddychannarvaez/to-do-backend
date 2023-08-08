import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note: Note = new Note();
    note.dateCreated = createNoteDto.dateCreated;
    note.title = createNoteDto.title;
    note.content = createNoteDto.content;
    note.isArchived = createNoteDto.isArchived;
    note.isFavorite = createNoteDto.isFavorite;
    note.images = createNoteDto.images;
    note.position = createNoteDto.position;
    return this.noteRepository.save(note);
  }

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id: id });
  }

  update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note: Note = new Note();
    note.id = updateNoteDto.id ?? 0;
    note.dateCreated = updateNoteDto.dateCreated ?? 0;
    note.title = updateNoteDto.title ?? '';
    note.content = updateNoteDto.content ?? '';
    note.isArchived = updateNoteDto.isArchived ?? false;
    note.isFavorite = updateNoteDto.isFavorite ?? false;
    note.images = updateNoteDto.images ?? [];
    note.position = updateNoteDto.position ?? 0;
    return this.noteRepository.save(note);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.noteRepository.delete(id);
  }
}
