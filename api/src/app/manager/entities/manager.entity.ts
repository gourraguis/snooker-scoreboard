import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Manager {
  @PrimaryColumn()
  phoneNumber: string

  @Column()
  name: string

  @Column()
  owner: string
}
