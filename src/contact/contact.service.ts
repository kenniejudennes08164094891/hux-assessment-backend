import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateContactDto, PaginateDTO } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {

  private logger: Logger;
  constructor(
    @InjectRepository(Contact)  // For the other input fields
    private readonly contactRepository: Repository<Contact>,
  ) {
    this.logger = new Logger(ContactService.name);
  }


  async create(createContactDto: CreateContactDto): Promise<any> {
    const existingContact = await this.contactRepository.findOne({ where: { phoneNumber: createContactDto?.phoneNumber } });
    if (existingContact) {
      throw new HttpException('This phone number already exists', HttpStatus.PRECONDITION_FAILED);
    }

    const presentTime = new Date();
    const options: any = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

    try{
      let payload = {
        ...createContactDto,
        createdAt: presentTime.toLocaleString('en-US', options)
      }
  
      const entity = this.contactRepository.create(payload);
      await this.contactRepository.save(entity);
  
      const successMessage: any = {
        message: `${createContactDto?.firstName}'s profile has been created successfully`,
        createdAt: payload?.createdAt,
        details: entity
      }
      return successMessage;
    }catch(err:any){
      this.logger.error('err from create a contact>>', err);
    }
  }



  async findAll(paginateDTO: PaginateDTO): Promise<Contact[] | any> {
    const { pageNo, limit }: any = paginateDTO;
    const skip = (pageNo - 1) * limit;

    if (pageNo < 1) {
      throw new HttpException("pageNo must start from 1", HttpStatus.BAD_REQUEST);
    } else if (limit < 0 || limit > 10) {
      throw new HttpException("limit must start from 0 to 10", HttpStatus.BAD_REQUEST);
    }

    try{
      const [contacts, totals] = await this.contactRepository.findAndCount({
        skip,
        take: limit
      })
  
      const paginationResponse: any = {
        contacts,
        paginationParams: {
          totals: totals,
          pageNo: Number(pageNo),
          limit: Number(limit)
        }
      };
      return paginationResponse;
    }catch(err:any){
      this.logger.error('err from fetch all contacts>>', err);
    }
  }


  async findOne(phoneNumber: string): Promise<any> {
    const contact = await this.contactRepository.findOne({ where: { phoneNumber: phoneNumber } });
    if (!contact) {
      throw new HttpException("Phone number does not exist", HttpStatus.NOT_FOUND);
    }

    try {
      const data = {
        message: `${contact?.firstName}'s details has been fetched successfully`,
        details: contact
      }
      return data;
    } catch (err: any) {
      this.logger.error('err from fetch single contact>>', err);
    }
  }


  async update(phoneNumber: string, updateContactDto: UpdateContactDto): Promise<any> {
    const contact = await this.contactRepository.findOne({ where: { phoneNumber: phoneNumber } });
    if (!contact) {
      throw new HttpException("Phone number does not exist", HttpStatus.NOT_FOUND)
    }

    try {
      const presentTime = new Date();
      const options: any = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
      Object.assign(contact, updateContactDto);
      await this.contactRepository.save(contact);

      const successMessage: any = {
        message: `${updateContactDto?.firstName}'s profile has been updated successfully`,
        updatedAt: presentTime.toLocaleString('en-US', options),
        details: contact
      }

      return successMessage;
    } catch (err: any) {
      this.logger.error('err from update contact>>', err);
    }

  }

  async remove(id: any): Promise<any> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new HttpException("Contact does not exist", HttpStatus.NOT_FOUND)
    }
    this.contactRepository.delete(id);
    const successResponse: any = { message: "Contact has been deleted successfully!" }
    return successResponse;
  }
}
