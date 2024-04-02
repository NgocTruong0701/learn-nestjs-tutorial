import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsArray()
    @IsNumber({}, {each: true})
    @IsNotEmpty()
    readonly songIds: number[];

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}
