import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class College{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  des:string;

  @Column()
  create_ts: string;

  @Column()
  type:string;

  @Column()
  tag: string;

  @Column()
  schoolfellow:string;

  @Column()
  department:string;

  @Column()
  website:string;

  @Column('int')
  code:number;

  @Column()
  motto:string;

}