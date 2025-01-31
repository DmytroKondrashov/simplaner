import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  listId: number;
}
