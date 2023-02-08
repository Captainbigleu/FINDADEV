import { Injectable } from '@nestjs/common';
import { CompetencesController } from './competences.controller'; 
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { FindAllCompetenceDto } from './dto/findAll-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity'


@Injectable()
export class CompetencesService {
  async createComp(createCompetenceDto: CreateCompetenceDto) {
    return await Competence.create({ ...createCompetenceDto }).save();
  }

<<<<<<< HEAD
  async findAllComp(findAllCompetenceDto: FindAllCompetenceDto):Promise <Competence []> {
=======
  async findAllComp(findAllCompetenceDto: FindAllCompetenceDto) {
>>>>>>> d7c6b62cab53b2b76137dab82f58c404e85baf21
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
