import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        if (!body.email || !body.password) {
            throw new HttpException('Email e senha são obrigatórios', HttpStatus.BAD_REQUEST);
        }
        return this.authService.login(body.email, body.password);
    }
} 