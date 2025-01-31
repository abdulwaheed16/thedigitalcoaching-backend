// src/students/dto/create-student.dto.ts
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsNotEmpty()
  program: string;

  @IsNotEmpty()
  subjects: string[];

  @IsNotEmpty()
  examDate: string;

  isVerified?: boolean;

  otp?: string;
  otpExpires?: Date;
}
