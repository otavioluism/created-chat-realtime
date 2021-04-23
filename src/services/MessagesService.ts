import { getCustomRepository, Repository } from 'typeorm';
import Message from '../entities/Message';
import MessagesRepository from '../repositories/MessagesRepository';

interface IMessageCreate { 
  admin_id?: string;
  text: string;
  user_id: string;
}

export default class MessagesService { 
  private messagesRepository: Repository<Message>;

  constructor () { 
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  public async create({ admin_id,  user_id, text }: IMessageCreate): Promise<Message> { 

    const message = this.messagesRepository.create({ 
      admin_id,
      text, 
      user_id,
    });

    await this.messagesRepository.save(message);

    return message;
  }

  public async listByUser(user_id: string): Promise<Message[]> { 

    const list = await this.messagesRepository.find({ 
      where: { user_id },
      relations: ['user']
    });

    return list;
  }
}