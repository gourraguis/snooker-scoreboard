import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Owner {
  // owner id is his phone number
  @PrimaryColumn()
  id: string

  @Column()
  fullName: string

  @Column()
  clubName: string

  @Column()
  address: string

  @Column()
  balance: number

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
