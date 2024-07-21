import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsArray, IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {  ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto extends PartialType(CreateContactDto) {
    @IsString() @IsNotEmpty() @IsNotEmpty({message: "firstName is a required field"}) @ApiProperty()
    public firstName: string;

    @IsString() @IsNotEmpty() @IsNotEmpty({message: "lastName is a required field"}) @ApiProperty()
    public lastName: string;

    @IsString() @IsNotEmpty() @IsNotEmpty({message: "phoneNumber is a required field"}) @ApiProperty()
    public phoneNumber: string;
}
