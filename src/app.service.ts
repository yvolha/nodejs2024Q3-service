import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Home Library API by Volha Yakauleva @yvolha';
  }
}
