import { Injectable } from '@nestjs/common';
import { CompetencesController } from './competences.controller'; 
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class CompetencesService {
  async createComp(createCompetenceDto: CreateCompetenceDto, user : User) {
    return await Competence.create({ ...createCompetenceDto, user:user }).save();
  }

  async findAllComp():Promise <Competence []> {
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
