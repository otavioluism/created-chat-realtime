import { EntityRepository, Repository } from "typeorm";
import Message from "../entities/Message";

@EntityRepository(Message)
export default class MessagesRepository extends Repository<Message>{ 

}