
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    

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
        unique:true
    })
    email: string;


    @Column({
        nullable: false,
        unique: true
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


    @Column()
    department:string


    @Column()
    area:string


    @Column()
    country:string


    
}




