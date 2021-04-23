import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import User from "./User";

@Entity('messages')
export default class Message { 

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: 'user_id' }) // qual campo que vai se juntar o atributo user
  @ManyToOne(() => User)
  user: User;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
   
    if (!this.id) { 
      this.id = uuid();
    }

   }
}