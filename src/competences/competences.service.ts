import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CompetencesController } from './competences.controller';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity'


@Injectable()
export class CompetencesService {

  async createComp(createCompetenceDto: CreateCompetenceDto, user: User) {
    const competences = Competence.create({ ...createCompetenceDto });
    delete user.password
    competences.user = user;
    return await competences.save()
  }

  async findCompetences(): Promise<Competence[]> {
    return await Competence.find();
  }

  async findCompetenceById(id: number) {
    const competence= await Competence.findOne({ relations: { user: true }, where: { id } })
    if (!competence) {
      return undefined;
    }
    return competence;
  }
  async updateComp(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    const comp = await Competence.findOneBy({ id });
    if (updateCompetenceDto.competence) comp.competence = updateCompetenceDto.competence;
    return await comp.save();
  }

  async findByCompetenceAndUser(userId:number, competence: string){
    return await Competence.findOne({ where: { user: {id: userId}, competence : competence }});
  }
  async deleteComp(id: number) {
    return await Competence.delete({id})
  }

}
