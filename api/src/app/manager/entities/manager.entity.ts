import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Owner } from '../../owner/entities/owner.entity'

@Entity()
export class Manager {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Index()
  @Column()
  ownerId: string

  @ManyToOne(() => Owner, (owner) => owner.id)
  owner: Owner

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
