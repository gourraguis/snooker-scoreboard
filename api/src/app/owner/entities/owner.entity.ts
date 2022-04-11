import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Owner {
  @PrimaryColumn()
  phoneNumber: string

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  clubName: string

  @Column({
    nullable: true,
  })
  address: string

  @Column()
  balance: number

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
