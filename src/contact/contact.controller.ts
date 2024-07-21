import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseInterceptors, UploadedFile, ParseIntPipe, NotFoundException, Res, UsePipes, UseGuards} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, PaginateDTO } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';    // For swagger API documentations
import {Logger} from "@nestjs/common";
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('contact')
@ApiTags('Contact Controller')
@ApiBearerAuth() 
export class ContactController {

  private logger: Logger;
  constructor(private readonly contactService: ContactService) {
    this.logger = new Logger(ContactController.name);
  }

  @Post('v1/create-new-contact')
  @UseGuards(JwtGuard)
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  @ApiOperation({ summary: "Create a New Contact", description: "Contact's Phone number is unique!" })
  create(@Body() createContactDto: CreateContactDto): Promise<any>{
    return this.contactService.create(createContactDto);
  }

  @Get('v1/fetch-all-contacts')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Get List of All Contacts", description: "All records are paginated" })
  @ApiQuery({ name: 'pageNo', type: Number, required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Displays 10 Talents per page' })
  findAll(
    @Query(new ValidationPipe()) paginateDTO: PaginateDTO,
  ) {
   return this.contactService.findAll(paginateDTO);
  }

  @Get('v1/fetch-single-contact/:phoneNumber')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Fetch Single Contact" })
  findOne(@Param('phoneNumber') phoneNumber: string) {
    return this.contactService.findOne(phoneNumber);
  }

  @Patch('v1/update-single-contact/:phoneNumber')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Input old phone number at the param box" })
  update(@Param('phoneNumber') phoneNumber: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(phoneNumber, updateContactDto);
  }

  @Delete('v1/delete-single-contact/:id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Delete a contact" , description: "Contacts can be deleted!" })
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
