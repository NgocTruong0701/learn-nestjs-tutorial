import { Injectable, Scope } from '@nestjs/common';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';

@Injectable(
    {
        scope: Scope.TRANSIENT
    }
)
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
    ){};

    async create(songDTO: CreateSongDTO): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.releasedDate = songDTO.releasedDate;
        song.lyrics = songDTO.lyrics;

        return await this.songRepository.save(song);
    }

    async findAll(): Promise<Song[]> {
        return await this.songRepository.find();
    }

    async findOne(id: number): Promise<Song> {
        return await this.songRepository.findOneBy({id});
    }

    async update(id: number, songDto: UpdateSongDTO): Promise<UpdateResult>{
        return await this.songRepository.update(id, songDto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.songRepository.delete({id});
    }
}
