
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Competence } from "src/competences/entities/competence.entity";
import { Language } from "src/languages/entities/language.entity";
import { Friendship } from "src/friendships/entities/friendship.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty()
    @Column({
        length: 20,
        unique: true,
        nullable: false
    })
    pseudo: string;

    @ApiProperty()
    @Column({
        length: 50,
        nullable: false
    })
    firstname: string;

    @ApiProperty()
    @Exclude()
    @Column({
        length: 50,
        nullable: false
    })
    lastname: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: false
    })
    email: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: false,
    })
    password: string;

    @ApiProperty()
    @Exclude()
    @Column({
        nullable: false
    })
    adresse: string;

    @ApiProperty()
    @Column({
        nullable: true
    })
    adresse_line2: string;

    @ApiProperty()
    @Column({
        nullable: false
    })
    zipCode: string;

    @ApiProperty()
    @Column({
        nullable: false
    })
    city: string

    @ApiProperty()
    @Column({
        nullable: false
    })
    area: string

    @ApiProperty()
    @Column({
        nullable: false
    })
    country: string

    @ApiProperty()
    @Column({
        nullable: true
    })
    presentation: string

    @ApiProperty({ type: () => Competence })
    @OneToMany(() => Competence, (competence) => competence.user, { eager: true })

    competences: Competence[]

    @ApiProperty({ type: () => Language })
    @OneToMany(() => Language, (language) => language.user, /* { eager: true } */)

    languages: Language[]

    @ApiProperty({ type: () => Friendship })
    @OneToMany(() => Friendship, (friendship) => friendship.user, { eager: true })

    friendships: Friendship[]

    @ApiProperty({ type: () => Friendship })
    @OneToMany(() => Friendship, (friends) => friends.user,  { eager: true })

    friends: Friendship[]




}




