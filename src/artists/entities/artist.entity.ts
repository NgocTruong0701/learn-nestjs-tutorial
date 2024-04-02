import { Song } from "src/songs/song.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;


    @OneToOne((type) => User)
    @JoinColumn()
    user: User;

    @ManyToMany((type) => Song, (song) => song.artists)
    songs: Song[];
}
