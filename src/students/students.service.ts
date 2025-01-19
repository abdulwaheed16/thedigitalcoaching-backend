import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
// import { generateOtp } from 'src/utils/generate-otp.util';
// import crypto from 'crypto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    // generate otp and set otpExpires
    // const otp = crypto.randomInt(100000, 999999).toString();
    const otp = '1234';
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    console.log('OTP: ' + otp);

    try {
      const user = await this.prisma.student.create({
        data: { ...createStudentDto, otp, otpExpires },
      });
      return { ...user, otp, otpExpires };
    } catch (error) {
      console.error('Error creating student:', JSON.stringify(error, null, 2));
    }
  }

  // Verify the OTP
  async verify(phone: string, otp: string) {
    const user = await this.prisma.student.findFirst({
      where: { phone },
      select: { id: true, otp: true, otpExpires: true },
    });

    if (!user) {
      throw new NotFoundException('Invalid phone number or OTP');
    }

    if (user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (user.otpExpires < new Date()) {
      throw new BadRequestException('OTP has expired');
    }

    const result = await this.updateVerification(user.id, true);
    return result;
  }

  // resend the otp
  async resendOtp(phone: string) {
    const user = await this.prisma.student.findFirst({
      where: { phone },
      // select: { id: true, otp: true, otpExpires: true },
    });

    if (!user) {
      throw new NotFoundException('Invalid phone number');
    }

    // generate new otp and set otpExpires
    // const otp = generateOtp();
    const otp = '1234';
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.student.update({
      where: { id: user.id },
      data: { otp, otpExpires },
    });

    return { isSucess: true, message: 'New OTP has been sent to you' };
  }

  // Find single user by ID
  async findOne(id: string) {
    return await this.prisma.student.findUnique({ where: { id } });
  }

  // Find single user by Email Address
  async findByEmail(email: string) {
    return await this.prisma.student.findUnique({ where: { email } });
  }

  // Find all users
  async findAll() {
    return await this.prisma.student.findMany();
  }

  // Update user by ID
  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return await this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  // update verification
  async updateVerification(id: string, isVerified: boolean) {
    const updatedUser = await this.prisma.student.update({
      where: { id },
      data: { isVerified },
    });

    return { ...updatedUser, otp: null, otpExpires: null };
  }

  // Delete user by ID
  async remove(id: string) {
    return await this.prisma.student.delete({ where: { id } });
  }

  // remove all students
  async removeAll() {
    return await this.prisma.student.deleteMany();
  }
}
