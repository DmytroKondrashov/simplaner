import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column('int', { array: true, nullable: true })
  items?: number[];
}
