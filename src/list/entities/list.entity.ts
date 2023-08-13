import { Note } from 'src/note/entities/note.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    // name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
    type: 'bigint',
    name: 'date_created',
    // default: '',
  })
  dateCreated: number;

  @Column({
    nullable: false,
    type: 'varchar',
    default: '',
  })
  title: string;

  @Column({
    name: 'is_archived',
    default: false,
  })
  isArchived: boolean;

  @Column({
    name: 'is_favorite',
    default: false,
  })
  isFavorite: boolean;

  @Column("int", {
    array: true,
    nullable: true,
  })
  notes: Note[];

  @Column({
    type: 'int',
  })
  position: number;
}
