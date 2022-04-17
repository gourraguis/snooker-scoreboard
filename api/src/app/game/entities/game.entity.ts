import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Board } from '../../board/entities/board.entity'
import { Manager } from '../../manager/entities/manager.entity'
import { Owner } from '../../owner/entities/owner.entity'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: string

  @Index()
  @Column()
  boardId: string

  @ManyToOne(() => Board, (board) => board.id)
  board: Board

  @Index()
  @Column()
  managerId: string

  @ManyToOne(() => Manager, (manager) => manager.id)
  manager: Manager

  @Index()
  @Column()
  ownerId: string

  @ManyToOne(() => Owner, (owner) => owner.id)
  owner: Owner

  @Column()
  winner: string

  @Column()
  loser: string

  @Column()
  startedAt: Date

  @Column()
  finishedAt: Date
}
