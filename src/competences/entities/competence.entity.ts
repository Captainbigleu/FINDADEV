import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("competences")
export class Competence extends BaseEntity {

    @PrimaryGeneratedColumn()

    id: number

    @Column({ nullable: false })

    competence: string

    @ManyToOne(() => User, (user) => user.competences, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    user: User

}
