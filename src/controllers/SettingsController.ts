import { Request, Response } from 'express';
import { RepositoryNotTreeError } from 'typeorm';
import SettingsService from '../services/SettingsService';

export default class SettingsController { 

   public async create(request: Request, response: Response): Promise<Response> { 
     try {   
        const {chat, username} = request.body;

        const settingsService = new SettingsService();

        const setting = await settingsService.execute({chat, username});
    
        return response.status(201).json(setting);

      } catch (err) { 

        return response.status(400).json({
          message: err.message,
        });

      }
  }

}