import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller({
    path: 'songs',
    scope: Scope.REQUEST
})
export class SongsController {
    constructor(
        private readonly songsService: SongsService,
        @Inject('CONNECTION')
        private connection: Connection,
    ) {
        console.log(`CONNECTION: ${this.connection.CONNECTION_STRING}`);
    }

    @Post()
    create(@Body() createSongDto: CreateSongDTO): Promise<Song> {
        try {
            return this.songsService.create(createSongDto);
        } catch (err) {
            throw new HttpException('Server error: ' + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @Get()
    // findAll(): Promise<Song[]> {
    //     try {
    //         return this.songsService.findAll();
    //     } catch (err) {
    //         throw new HttpException('Server error: ' + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    @Get('/:id')
    findOne(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    ): Promise<Song> {
        return this.songsService.findOne(id);
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() updateSongDto: UpdateSongDTO): Promise<UpdateResult> {
        return this.songsService.update(id, updateSongDto);
    }

    @Delete('/:id')
    delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    ): Promise<DeleteResult> {
        return this.songsService.delete(id);
    }

    @Get()
    pagination(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;

        return this.songsService.paginate({
            page,
            limit,
            route: '/songs'
        })
    }
}
