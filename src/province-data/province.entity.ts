import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Province {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column(
        {
            nullable: true
        }
    )
    abbr: string;

    @CreateDateColumn({ comment: '创建时间',type:'datetime' })  // 自动生成列
    created_ts: string

    @UpdateDateColumn({ comment: '更新时间',type:'datetime'})   // 自动生成并自动更新列
    updated_ts: string


}