import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";



@Entity("friendships")
export class Friendship extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        default: false,
        nullable: false
    })
    accepted: boolean


    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.friendships, { nullable: false, onDelete: 'CASCADE' })
    user: User;
    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.friends, { nullable: false, onDelete: 'CASCADE'})

    friend: User;




}
