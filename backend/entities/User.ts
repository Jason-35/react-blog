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
    post => post.user,
    { cascade: true}
  )
  post: Post[]

  @OneToMany(
    () => Comment,
    comment => comment.user,
    { cascade: true}
  )
  comment: Comment[]


  @Column({nullable: true})
  session: string | null;
}