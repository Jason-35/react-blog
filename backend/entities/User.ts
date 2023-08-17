import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Post } from './Post';
import { Comment } from './Comment';

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

  @OneToMany(
    () => Comment,
    comment => comment.user
  )
  comment: Comment[]


  @Column({nullable: true})
  session: string | null;
}