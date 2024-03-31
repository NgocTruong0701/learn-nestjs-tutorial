import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    artists: string[];

    @Column({type: 'date'})
    releasedDate: Date;

    @Column({type: 'time'})
    duration: Date;

    @Column({type: 'text'})
    lyrics: string;
}