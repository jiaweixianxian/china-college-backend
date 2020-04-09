import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  follow_college_id: string;

  @Column()
  name: string;

  @Column()
  tag: string;

  @Column()
  city: string;
}