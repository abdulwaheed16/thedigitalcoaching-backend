// src/students/dto/create-student.dto.ts
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsPhoneNumber(null, { message: 'Phone number must be valid.' })
  phone: string;

  @IsNotEmpty({ message: 'Program is required.' })
  program: string;

  @IsNotEmpty({ message: 'At least one subject is required.' })
  subjects: string[];

  @IsNotEmpty({ message: 'Exam date is required.' })
  examDate: string;

  message?: string;

  otp?: string;
  otpExpires?: Date;
}
