import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";




@Entity("languages")
export class Language extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 200,
        nullable: false
    })
    programmingLanguage: string;

    @ManyToOne(() => User, (user) => user.languages, { nullable: false, onDelete: 'CASCADE' })
    user: User;







}
