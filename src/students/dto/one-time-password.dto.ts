import { IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsNotEmpty({ message: 'OTP is required' })
  otp: string;
}

export class ResendOtpDto {
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;
}
