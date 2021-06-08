import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from '../common/guards/login.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Request() req, @Res() res: Response) {
    res.send(req.user);
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.send({ message: 'success' });
  }
}
