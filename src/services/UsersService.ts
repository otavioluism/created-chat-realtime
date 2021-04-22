import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

interface IUsersCreate { 
  email: string;
}

export default class UsersService { 

    public async execute({ email }: IUsersCreate): Promise<User> { 

      const usersRepository = getCustomRepository(UsersRepository);
      
      const userAlreadyExists = await usersRepository.findOne({
        email
      });

      if (userAlreadyExists) { 
        return userAlreadyExists;
      }

      const user = usersRepository.create({
        email
      });
      
      await usersRepository.save(user);

      return user;
    }
}