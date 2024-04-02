import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from './entities/playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlayList)
    private playListRepository: Repository<PlayList>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto): Promise<PlayList> {
    const playList = new PlayList();
    playList.name = createPlaylistDto.name;

    // songs will be the array of ids that we getting from the DTO object
    const songs = await this.songRepository.findBy({id: In(createPlaylistDto.songIds)});
    // set the relation for the songs with playlist entity
    playList.songs = songs;

    // A user will be the id of the user we are getting from the request
    // When we implemented the user authentication this id will become the loggedIn user id
    const user = await this.userRepository.findOneBy({id: createPlaylistDto.userId});
    playList.user = user;
    
    return await this.playListRepository.save(playList);
  }

  findAll() {
    return `This action returns all playlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
