import { User } from "src/users/entities/user.entity";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity("competences")
export class Competence extends BaseEntity {

    @PrimaryGeneratedColumn()

    id: number

    @Column({ nullable: false })

    competence: string

    @ApiProperty({type : () => User})
    @ManyToOne(() => User, (user) => user.competences, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    user: User

}
