import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './properties.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  district: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ nullable: true })
  number: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;

  @OneToOne(() => Property)
  @JoinColumn()
  property: Property;
}
