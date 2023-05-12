import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admin' })
export class AdminSchema {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  adminName: string;

  @Column({ unique: true })
  adminMail: string;

  @Column()
  adminPassword: string;

  @Column()
  createdAt: Date;
}
