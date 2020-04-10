import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class College {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_year: string;

  @Column()
  type: string;

  @Column()
  tag: string;

  @Column()
  schoolfellow: string;

  @Column()
  department: string;

  @Column()
  website: string;

  @Column('int')
  code: number;

  @Column()
  motto: string;

  @Column({
    nullable: true
  })
  create_ts: string;

  @Column({
    nullable: true
  })
  update_ts: string;


  @Column('text')
  des: string;

}