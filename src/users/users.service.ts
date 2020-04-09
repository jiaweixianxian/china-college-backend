import { Injectable,HttpException ,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}


  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.tag = createUserDto.tag;
    user.city=createUserDto.city;
    return this.usersRepository.save(user);
  }

  async update(id,createUserDto: CreateUserDto):Promise<void>{
    await this.checkUserExist(id);
    await this.usersRepository.update(id,createUserDto);
  }


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.checkUserExist(id);
    await this.usersRepository.delete(id);
  }

  async checkUserExist(userId){
    try {
      await this.usersRepository.findOneOrFail(userId);
    }
    catch (e) {
      throw new HttpException({
        status: 'USER_NOT_FOUND',
        error: 'Not found the users',
      }, HttpStatus.NOT_FOUND);
    }
  }
}