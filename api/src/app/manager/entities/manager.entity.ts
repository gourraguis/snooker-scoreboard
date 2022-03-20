import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Manager {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  otp: string

  @Column()
  owner: string
}
