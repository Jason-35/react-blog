import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Post } from './Post'

@Entity()
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @ManyToOne(
        () => User,
        user => user.post
    )

    @JoinColumn({
        name: 'username'
    })
    user: User

    @ManyToOne(
        () => Post,
        post => post.comment
    )

    @JoinColumn({
        name: 'post'
    })
    post: Post
}