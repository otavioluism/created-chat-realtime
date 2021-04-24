import { getCustomRepository, Repository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

interface IUsersCreate { 
  email: string;
}

export default class UsersService { 
  private usersRepository: Repository<User>;

  constructor () { 
    this.usersRepository = getCustomRepository(UsersRepository);
  }

    public async create({ email }: IUsersCreate): Promise<User> { 
      
      const user = this.usersRepository.create({
        email
      });
      
      await this.usersRepository.save(user);

      return user;
    }

  public async findByEmail({ email }: IUsersCreate): Promise<User | null> { 
    
    const user = await this.usersRepository.findOne({
      email
    });

    if (!user) { 
      return null;
    }

    return user;
  }
}