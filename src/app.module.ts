import { Module } from '@nestjs/common/decorators';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [PrismaModule, TeachersModule, StudentsModule],
  controllers: [AppController, StudentsController],
  providers: [AppService, PrismaService, StudentsService],
})
export class AppModule {}
