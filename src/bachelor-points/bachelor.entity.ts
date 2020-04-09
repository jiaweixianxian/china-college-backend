import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BachelorPoints{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  college_id:number;

  @Column()
  year: string;

  @Column()
  province:string;

  @Column()
  branch:string;

  @Column()
  batch:number;

  @Column('double')
  points:number;
}
