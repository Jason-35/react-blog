import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

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