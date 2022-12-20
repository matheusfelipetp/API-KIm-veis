import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';
import { Schedules } from './schedulesUserProperties.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column('decimal', { precision: 12, scale: 2 })
  value: number;

  @Column('integer')
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @OneToMany(() => Schedules, (schedule) => schedule.id)
  schedules: Schedules[];
}
