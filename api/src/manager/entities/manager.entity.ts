import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Owner {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  manager: string
}
