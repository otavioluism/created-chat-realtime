import { getCustomRepository, Repository } from 'typeorm';
import Setting from '../entities/Setting';
import SettingsRepository from '../repositories/SettingsRepository';

interface ISettingsCreate { 
  chat: boolean;
  username: string;
}

export default class SettingsService { 
  private settingsRepository: Repository<Setting>;

  constructor() { 
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

    public async create({ chat, username }: ISettingsCreate): Promise<Setting> { 

      const userAlreadyExists = await this.settingsRepository.findOne({
        username
      })

      if (userAlreadyExists) { 
        throw new Error('User already exists!');
      }
    
      const setting = this.settingsRepository.create({ 
        chat,
        username,
      });
    
      await this.settingsRepository.save(setting);

      return setting;
    }

    public async findByUsername(username: string): Promise<Setting> { 
      const settings = await this.settingsRepository.findOne({
        username
      });

      return settings;
    }

    public async update(username: string, chat: boolean): Promise<void> { 
      
      const settings = await this.settingsRepository.createQueryBuilder().
      update(Setting)
      .set({ chat })
      .where("username = :username", { 
        username
      })
      .execute();

    }
}