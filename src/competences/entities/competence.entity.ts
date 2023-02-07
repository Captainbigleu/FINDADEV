import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";

@Entity("competences")
export class Competence extends BaseEntity {

    @PrimaryGeneratedColumn()

    id : number

    @Column({ nullable : false })

    competence : string

   /*  @Column({ nullable :false })

    userId : number */

    /* @ManyToOne(() => User, (user) => user.competence, {
        nullable: false
    })
    user: User */
}
