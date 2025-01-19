import { IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty({ message: 'Email number is required' })
  email: string;

  @IsNotEmpty({ message: 'OTP is required' })
  otp: string;
}

export class ResendOtpDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
