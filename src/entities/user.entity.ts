import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.entity';
import { IUser } from '../types';

@Entity({ name: 'users' })
export class User extends BaseModel implements IUser {
  @Column({ unique: true, nullable: false })
  clerkId: string = '';

  @Column()
  name: string = '';

  @Column({ unique: true, nullable: false })
  email: string = '';

  @Column({ type: 'varchar', nullable: true })
  profilePicture?: string | undefined;

  @Column({ type: 'numeric', default: 0 })
  trainedModelCount: number = 0;

  @Column({ type: 'numeric', default: 0 })
  coins: number = 0;
}
