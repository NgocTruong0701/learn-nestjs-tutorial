import { Artist } from "src/artists/entities/artist.entity";
import { PlayList } from "src/playlists/entities/playlist.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column({ type: 'varchar', length: 255, nullable: true })
    // artists: string[];

    @Column({type: 'date'})
    releasedDate: Date;

    @Column({type: 'time'})
    duration: Date;

    @Column({type: 'text'})
    lyrics: string;

    @ManyToMany((type) => Artist, (artist) => artist.songs, {cascade: true})
    @JoinTable({name: 'songs_artists'})
    artists: Artist[];

    @ManyToOne((type) => PlayList, (playlist) => playlist.songs)
    playList: PlayList;
}