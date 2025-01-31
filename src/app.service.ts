import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Hello! The Digital Coaching' };
  }
}
