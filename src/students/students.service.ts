import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.prisma.student.create({ data: createStudentDto });
  }
  async findOne(id: string) {
    return await this.prisma.student.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prisma.student.findMany();
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return await this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.student.delete({ where: { id } });
  }
}
