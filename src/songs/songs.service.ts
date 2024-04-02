import { Injectable, Scope } from '@nestjs/common';
import { Song } from './song.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable(
    {
        scope: Scope.TRANSIENT
    }
)
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>,
    ) { };

    async create(songDTO: CreateSongDTO): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        // song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;

        // find all the artists on the based on ids
        const artists = await this.artistRepository.findBy({id: In(songDTO.artists)});

        // set the relationships with artist and songs
        song.artists = artists;

        return await this.songRepository.save(song);
    }

    async findAll(): Promise<Song[]> {
        return await this.songRepository.find();
    }

    async findOne(id: number): Promise<Song> {
        return await this.songRepository.findOneBy({ id });
    }

    async update(id: number, songDto: UpdateSongDTO): Promise<UpdateResult> {
        const { artists, ...updateData } = songDto; // Loại bỏ trường artists để tránh lỗi
        // find all the artists on the based on ids
        const artistsEntity = await this.artistRepository.findBy({id: In(artists)});
        return await this.songRepository.update(id, { ...updateData, artists: artistsEntity });
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.songRepository.delete({ id });
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        return paginate(this.songRepository, options);
    }
}
