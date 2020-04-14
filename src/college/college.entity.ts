import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class College {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  createdYear: string;

  @Column({
    nullable: true
  })
  type: string;


  @Column({
    nullable: true,
    type: 'simple-array'
  })
  tags: string[];

  @Column({
    nullable: true
  })
  category: string;


  @Column({
    nullable: true,
    type: 'simple-array'
  })
  schoolFellow: string;

  @Column({
    nullable: true
  })
  department: string;

  @Column({
    nullable: true
  })
  website: string;

  @Column({
    nullable: true,
  })
  code: string;

  @Column({
    nullable: true
  })
  motto: string;

  @Column({
    nullable: true
  })
  location: string;

  @Column({
    nullable: true
  })
  provinceAbbr: string;

  @Column({
    nullable: true
  })
  create_ts: string;

  @Column({
    nullable: true
  })
  update_ts: string;


  @Column({
    nullable: true,
    type: 'text'
  })
  des: string;



}