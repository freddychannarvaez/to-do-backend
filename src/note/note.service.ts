import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  /**
   * Creates a note.
   * @param createNoteDto Note data.
   * @returns A promise containing the note data.
   */
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

  /**
   * Finds all notes.
   * @returns A promise containing the notes array.
   */
  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  /**
   * Finds all notes marked as favorite.
   * @returns A promise containing the favorite notes array.
   */
  findFavorites(): Promise<Note[]> {
    return this.noteRepository.find({ where: { isFavorite: true } });
  }

  /**
   * Finds one note by id.
   * @param id Id of the note to find.
   * @returns A promise containing the note or null in case it was not found.
   */
  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id: id });
  }

  /**
   * Searches all the notes matching the value by content property.
   * @param value Text string to find.
   * @returns A promise containing the found notes array.
   */
  search(value: string): Promise<Note[] | []> {
    return this.noteRepository
      .createQueryBuilder('note')
      .where('note.content like :value', { value: `%${value}%` })
      .getMany();
  }

  /**
   * Updates a note by id.
   * @param id Id of the note to udpate.
   * @param updateNoteDto Note data.
   * @returns A promise containing the note data.
   */
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

  /**
   * Deletes a note.
   * @param id Id of the note to delete.
   * @returns A promise containing the delete result.
   */
  remove(id: number): Promise<DeleteResult> {
    return this.noteRepository.delete(id);
  }
}
