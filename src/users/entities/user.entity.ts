
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Competence } from "src/competences/entities/competence.entity";
import { Language } from "src/languages/entities/language.entity";
import { Friendship } from "src/friendships/entities/friendship.entity";
import { Exclude } from "class-transformer";
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

    @Exclude()
    @Column({
        length:50,
        nullable:false
    })
    lastname:string;

    @Exclude()
    @Column({
        nullable:false
    })
    email: string;

    @Exclude()
    @Column({
        nullable: false,
    })
    password: string;

    @Exclude()
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
    zipCode: string;


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

    @OneToMany(() => Competence, (competence) => competence.user, { eager: true })

    competences: Competence[]

    @OneToMany(() => Language, (language) => language.user, /* { eager: true } */)

    languages: Language[]


    @OneToMany(() => Friendship, (friendship) => friendship.user, { eager: true })

    friendships: Friendship[]


     @OneToMany(() => Friendship, (friends) => friends.user, { eager: true })

    friends: Friendship[]  




}




