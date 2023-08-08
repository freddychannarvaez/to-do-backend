import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}

  create(createListDto: CreateListDto): Promise<List> {
    const list: List = new List();
    list.dateCreated = createListDto.dateCreated;
    list.title = createListDto.title;
    list.isArchived = createListDto.isArchived;
    list.isFavorite = createListDto.isFavorite;
    list.position = createListDto.position;
    list.notes = createListDto.notes;
    return this.listRepository.save(list);
  }

  findAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  findOne(id: number): Promise<List | null> {
    return this.listRepository.findOneBy({ id: id });
  }

  update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list: List = new List();
    list.id = updateListDto.id ?? 0;
    list.dateCreated = updateListDto.dateCreated ?? 0;
    list.title = updateListDto.title ?? '';
    list.isArchived = updateListDto.isArchived ?? false;
    list.isFavorite = updateListDto.isFavorite ?? false;
    list.position = updateListDto.position ?? 0;
    list.notes = updateListDto.notes ?? [];
    return this.listRepository.save(list);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.listRepository.delete(id);
  }
}
