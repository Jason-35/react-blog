import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment'; 

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column('text')
    content: string

    @ManyToOne(
        () => User,
        user => user.post
    )

    @JoinColumn({
        name: 'username'
    })
    user: User

    @OneToMany(
        () => Comment,
        comment => comment.post
    )
    comment: Comment


    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @Column({
        default: false,
        name: "published"
    })
    is_published: boolean
}