import { Song } from "src/songs/song.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlists')
export class PlayList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany((type) => Song, (song) => song.playList)
    songs: Song[];

    @ManyToOne((type) => User, (user) => user.playLists)
    user: User;
}