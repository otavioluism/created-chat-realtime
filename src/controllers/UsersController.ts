import { Request, Response } from "express";
import UsersService from '../services/UsersService';


export default class UsersController { 
  public async create(request: Request, response: Response): Promise<Response> { 
    try { 

      const { email } = request.body;

      const usersService = new UsersService();

      const user  = await usersService.execute({ email });

      return response.status(201).json(user);

    } catch (err) { 

      return response.status(400).json({ 
        message: err.message,
      });

    }

  }
}