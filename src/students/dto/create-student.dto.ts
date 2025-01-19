// src/students/dto/create-student.dto.ts
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsString()
  @IsPhoneNumber(null, { message: 'Phone number must be valid.' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Program is required.' })
  program: string;

  @IsNotEmpty({ message: 'At least one subject is required.' })
  subjects: string[];

  @IsString()
  @IsNotEmpty({ message: 'Exam date is required.' })
  examDate: string;

  @IsString()
  message?: string;

  @IsString()
  @IsOptional()
  otp?: string;

  @IsDate()
  @IsOptional()
  otpExpires?: Date;
}
