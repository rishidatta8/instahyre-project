import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.contacts)
  owner: User;

  @Column({ default: 0 })
  spamCount: number;
}
