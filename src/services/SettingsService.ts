import { getCustomRepository } from 'typeorm';
import Setting from '../entities/Setting';
import SettingsRepository from '../repositories/SettingsRepository';

interface ISettingsCreate { 
  chat: boolean;
  username: string;
}

export default class SettingsService { 
    public async execute({ chat, username }: ISettingsCreate): Promise<Setting> { 
      const settingsRepository = getCustomRepository(SettingsRepository);

      const userAlreadyExists = await settingsRepository.findOne({
        username
      })

      if (userAlreadyExists) { 
        throw new Error('User already exists!');
      }
    
      const setting = settingsRepository.create({ 
        chat,
        username,
      });
    
      await settingsRepository.save(setting);

      return setting;
    }
}