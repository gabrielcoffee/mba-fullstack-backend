import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) return null;
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Credenciais inválidas');
        // Gere um token JWT
        const payload = { sub: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'segredo', { expiresIn: '1h' });
        return { access_token: token };
    }
} 