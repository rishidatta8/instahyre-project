import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from './contacts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  password?: string;

  @OneToMany(() => Contact, (contact) => contact.owner)
  contacts?: Contact[];

  @Column({ default: 0 })
  spamCount?: number;
}
