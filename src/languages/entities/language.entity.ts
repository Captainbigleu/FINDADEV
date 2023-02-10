import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";




@Entity("languages")
export class Language extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        length: 200,
        nullable: false
    })
    programmingLanguage: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, (user) => user.languages, { nullable: false, onDelete: 'CASCADE' })
    user: User;







}
