import { IsInt, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Note } from 'src/note/entities/note.entity';

export class CreateListDto {
  id: number;

  @IsInt()
  @IsNotEmpty()
  dateCreated: number;

  @IsString()
  title: string;

  @IsBoolean()
  isArchived: boolean;

  @IsBoolean()
  isFavorite: boolean;

  notes: Note[];

  @IsInt()
  position: number;
}
