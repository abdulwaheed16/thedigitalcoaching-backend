import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { ResendOtpDto, VerifyOtpDto } from './dto/one-time-password.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}
  private readonly logger = new Logger(StudentsController.name);

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    this.logger.log('Creating student: ' + JSON.stringify(createStudentDto));

    return this.studentService.create(createStudentDto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtp: VerifyOtpDto) {
    return this.studentService.verify(verifyOtp.email, verifyOtp.otp);
  }

  @Post('resend-otp')
  resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.studentService.resendOtp(resendOtpDto.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log('User ID: ', id);
    return this.studentService.findUserById(id);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

  // remove all students
  @Delete()
  // @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll(): Promise<{ message: string }> {
    this.logger.log('Removing all students');
    await this.studentService.removeAll();
    return { message: 'Students record deleted' };
  }
}
