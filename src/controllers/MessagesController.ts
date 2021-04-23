import { Request, Response } from 'express';
import MessagesService from '../services/MessagesService';


export default class MessagesController { 

  public async create(request: Request, response: Response): Promise<Response> { 
    try { 

      const { admin_id, text, user_id } = request.body;

      const messageService = new MessagesService();

      const message = await messageService.create({ 
        admin_id,
        text,
        user_id,
      });
      
      return response.status(201).json(message);

    } catch (err) { 
      
      return response.status(400).json({ 
        message: err.message
      });

    }
  }

  public async showByUser(request: Request, response: Response): Promise<Response> { 
    try { 

      const { id } = request.params;

      const messageService = new MessagesService();
  
      const list = await messageService.listByUser(id);
  
      return response.status(201).json(list);

    } catch (err) { 

      return response.status(400).json({
        message: err.message
      });

    }
  }
}