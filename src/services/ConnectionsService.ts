import { getCustomRepository, Repository } from "typeorm";
import Connection from '../entities/Connection';
import ConnectionsRepository from "../repositories/ConnectionsRepository";

interface IConnectionCreate { 
  socket_id: string; 
  user_id: string; 
  admin_id?: string;
  id?: string;
}

interface IConnectionFind { 
  user_id: string;
}

export default class ConnectionsService { 
  private connectionsRepository: Repository<Connection>

  constructor() { 
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  public async create({ socket_id, admin_id, user_id, id }: IConnectionCreate): Promise<Connection> { 

    const connection = this.connectionsRepository.create({
      socket_id,
      admin_id, 
      user_id, 
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  };

  public async findByUserId({ user_id }:IConnectionFind): Promise<Connection> { 
   
    const connection = await this.connectionsRepository.findOne({
      user_id
    });


    return connection;
  };

}