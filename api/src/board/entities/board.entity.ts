import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Board {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  owner: string
}
