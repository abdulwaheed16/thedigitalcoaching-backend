import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return { message: 'Hello from the The Digital Coaching' };
  }
}
