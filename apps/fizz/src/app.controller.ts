import { Controller, Get, Response } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  async root(@Response() response) {
    response.redirect('/doc');
  }
}
