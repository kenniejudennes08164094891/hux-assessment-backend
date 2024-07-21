import { IsArray, IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {  ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';  // For Pagination

export class CreateContactDto {
    @IsString() @IsNotEmpty() @IsNotEmpty({message: "firstName is a required field"}) @ApiProperty()
    public firstName: string;

    @IsString() @IsNotEmpty() @IsNotEmpty({message: "lastName is a required field"}) @ApiProperty()
    public lastName: string;

    @IsString() @IsNotEmpty() @IsNotEmpty({message: "phoneNumber is a required field"}) @ApiProperty()
    public phoneNumber: string;
}

export class PaginateDTO{
    
    //Pagination params
    @IsOptional() 
    pageNo: number = 1;
  
    @IsOptional()
    limit: number = 10;

}