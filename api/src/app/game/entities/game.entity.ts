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
  ownerId: string

  @Column()
  winner: string

  @Column()
  loser: string

  @Column()
  startedAt: Date

  @Column()
  finishedAt: Date
}
