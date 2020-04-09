import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MasterPoints{

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

  @Column('double')
  points:number;
}
