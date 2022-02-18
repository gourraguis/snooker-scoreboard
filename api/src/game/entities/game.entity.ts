import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  boardId: string

  @Column()
  managerId: string

  @Column()
  player1: string

  @Column()
  player2: string

  @Column()
  startedAt: Date

  @Column()
  finishedAt: Date
}
