
import { text } from "express";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:20,
        unique:true,
        nullable:false
    })
    pseudo:string;
    

    @Column({
        length: 50,
        nullable: false
    })
    firstname: string;


    @Column({
        length:50,
        nullable:false
    })
    lastname:string;


    @Column({
        nullable:false
    })
    email: string;


    @Column({
        nullable: false,
    })
    password: string;


    @Column({
        nullable: false
    })
    adresse: string;


    @Column({
        nullable:true
    })
    adresse_line2: string;


    @Column({
        nullable: false
    })
    zipCode: string


    @Column({
        nullable: false
    })
    city: string


    @Column({
        nullable:false
    })
    area:string


    @Column({
        nullable:false
    })
    country:string

    @Column({
        nullable:true
    })
    presentation:string  
}




