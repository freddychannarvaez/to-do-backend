import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateNoteDto {
  id: number;

  @IsInt()
  @IsNotEmpty()
  dateCreated: number;

  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'Content must have atleast 1 character.' })
  content: string;

  @IsBoolean()
  isArchived: boolean;

  @IsBoolean()
  isFavorite: boolean;

  images: any[];

  @IsInt()
  position: number;
}
