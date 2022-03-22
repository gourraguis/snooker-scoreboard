import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Owner {
  @PrimaryColumn()
  phoneNumber: string

  @Column()
  name: string

  @Column()
  balance: number

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
