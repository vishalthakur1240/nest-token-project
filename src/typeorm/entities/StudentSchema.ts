import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'student' })
export class StudentSchema {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  studentName: string;

  @Column({ unique: true })
  studentMail: string;

  @Column()
  studentClass: string;

  @Column()
  createdAt: Date;
}
