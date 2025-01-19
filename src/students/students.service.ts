import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { generateOtp } from 'src/utils/generate-otp.util';
// import { sendWhatsAppOtp } from 'src/utils/send-opt-whatsapp.util';
import { sendOtpByEmail } from 'src/utils/send-otp-email.util';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger(StudentsService.name);

  async create(createStudentDto: CreateStudentDto) {
    const otp = generateOtp();
    const otpExpires = this.getOtpExpiration();

    console.log('OTP: ' + otp);

    try {
      const existingUser = await this.prisma.student.findFirst({
        where: { email: createStudentDto?.email },
      });
      if (existingUser?.isVerified) {
        throw new BadRequestException('user already exists');
      }

      await this.prisma.student.create({
        data: { ...createStudentDto, otp, otpExpires },
      });

      // send the otp on whatsapp
      const messageId = await sendOtpByEmail(createStudentDto?.email, otp);
      return {
        isSuccess: true,
        message: 'OTP has been sent to you',
        otp,
        messageId,
      };
      // return sendWhatsAppOtp('+92 3120012250', otp);
    } catch (error) {
      console.error('Error creating student:', error);
      throw new BadRequestException(error?.message);
    }
  }

  async verify(email: string, otp: string) {
    const user = await this.findUserByEmail(email);
    this.logger.log('Verificaiton user', user?.otp);

    this.validateOtp(user, otp);

    return await this.updateVerification(user.id, true);
  }

  async resendOtp(email: string) {
    const user = await this.findUserByEmail(email);
    const otp = generateOtp();
    const otpExpires = this.getOtpExpiration();

    await this.prisma.student.update({
      where: { id: user.id },
      data: { otp, otpExpires },
    });

    const messageId = await sendOtpByEmail(email, otp);

    return {
      isSuccess: true,
      message: 'New OTP has been sent to you',
      messageId,
      otp,
    };
  }

  async findUserById(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findUserByEmail(email: string) {
    const student = await this.prisma.student.findFirst({ where: { email } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  private async findUserByPhone(phone: string) {
    const user = await this.prisma.student.findFirst({
      where: { phone },
      select: { id: true, otp: true, otpExpires: true },
    });

    if (!user) {
      throw new NotFoundException('Invalid phone number');
    }

    return user;
  }

  async findAll() {
    return await this.prisma.student.findMany();
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
    return updatedStudent;
  }

  async updateVerification(id: string, isVerified: boolean) {
    const updatedUser = await this.prisma.student.update({
      where: { id },
      data: { isVerified },
    });
    return { ...updatedUser, otp: null, otpExpires: null };
  }

  async remove(id: string) {
    const deletedStudent = await this.prisma.student.delete({ where: { id } });
    return deletedStudent;
  }

  async removeAll() {
    return await this.prisma.student.deleteMany();
  }

  // Helper Methods

  private validateOtp(user: any, otp: string) {
    const { otp: storedOtp, otpExpires } = user;

    if (storedOtp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpExpires < new Date()) {
      throw new BadRequestException('OTP has expired');
    }
  }

  private getOtpExpiration() {
    return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
  }
}
