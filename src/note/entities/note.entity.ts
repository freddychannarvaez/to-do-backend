import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
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
    // nullable: false,
    type: 'varchar',
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    type: 'varchar',
    default: '',
  })
  content: string;

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

  @Column({
    type: 'json',
    nullable: true,
  })
  images: any[];

  @Column({
    type: 'int',
  })
  position: number;
}
