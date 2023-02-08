import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CompetencesController } from './competences.controller'; 
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity'


@Injectable()
export class CompetencesService {
  
  async createComp(createCompetenceDto: CreateCompetenceDto, user : User) {
    const competences = Competence.create({ ...createCompetenceDto });
    delete user.password
    competences.user = user;
    return await competences.save()
  }

  async findCompetences() : Promise<Competence[]> {
    return await Competence.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} competence`;
  }

  update(id: number, updateCompetenceDto: UpdateCompetenceDto) {
    return `This action updates a #${id} competence`;
  }

  remove(id: number) {
    return `This action removes a #${id} competence`;
  }
}
