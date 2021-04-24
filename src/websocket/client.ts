import User from '../entities/User';
import { io } from '../http';
import ConnectionsService from '../services/ConnectionsService';
import UsersService from '../services/UsersService';
import MessagesService from '../services/MessagesService';

interface IParams { 
  text: string;
  email: string;
}

io.on('connect', (socket) => { 
  const connectionsService = new ConnectionsService();
  const usersServices = new UsersService(); 
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params) => { 
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    const userExists = await usersServices.findByEmail({ email });

    if (!userExists) {  

      const user = await usersServices.create({ email });
      user_id = user.id;

      await connectionsService.create({
        socket_id,
        user_id: user.id
      });

    } else { 

      user_id = userExists.id;

      const connection = await connectionsService.findByUserId({ 
        user_id: userExists.id 
      });

      if (!connection) {

        await connectionsService.create({ 
          socket_id,
          user_id: userExists.id
        }); 

      } else { 

        connection.socket_id = socket_id;

        await connectionsService.create(connection);
        
      }
    }
    

    await messagesService.create({
      text,
      user_id,
    });

  });
});