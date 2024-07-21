import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateAuthDto {

    @IsString() @IsEmail() @IsNotEmpty({message: "email is a required field"}) @ApiProperty()
    public email: string;

    @IsString()  @IsNotEmpty({message: "password is a required field"}) @ApiProperty()
    public password: string;
}
