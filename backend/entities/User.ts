import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  session: string | null;
}