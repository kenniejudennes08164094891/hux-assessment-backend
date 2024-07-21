import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, OneToMany, ManyToOne, JoinColumn, OneToOne, } from 'typeorm';

@Entity('contact', { synchronize: true })
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
    public id: string;

    @Column({ name: 'firstName', nullable: false, default: '' }) @IsString() @IsNotEmpty({ message: "Your First Name is a required field!" })
    public firstName: string;

    @Column({ name: 'lastName', nullable: false, default: '' }) @IsString() @IsNotEmpty({ message: "Your Last Name is a required field!" })
    public lastName: string;

    @Column({ name: 'phoneNumber', nullable: false, default: '' }) @IsString() @IsNotEmpty({ message: "Your phoneNumber is a required field!" })
    public phoneNumber: string;

    @Column({ name: 'createdAt', nullable: false, default: '' }) @IsString()
    public createdAt: string;
}
