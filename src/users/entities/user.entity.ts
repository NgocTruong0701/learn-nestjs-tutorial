import { Exclude } from "class-transformer";
import { PlayList } from "src/playlists/entities/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany((type) => PlayList, (playlist) => playlist.user)
    playLists: PlayList[];
}
