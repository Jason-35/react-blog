import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User extends BaseEntity{
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    () => Post,
    post => post.user
  )
  post: Post[]

  @Column({nullable: true})
  session: string | null;
}