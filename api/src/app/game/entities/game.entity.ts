import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  boardId: string

  @Column()
  managerId: string

  @Column()
  winner: string

  @Column()
  loser: string

  @Column()
  startedAt: Date

  @CreateDateColumn()
  finishedAt: Date
}
