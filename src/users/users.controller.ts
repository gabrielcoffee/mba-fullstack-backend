import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users - Buscar todos os usuários
  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException('Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET /users/:id - Buscar usuário por ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.findById(parseInt(id));
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao buscar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // POST /users - Criar novo usuário
  @Post()
  async create(@Body() userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      // Validação básica
      if (!userData.name || !userData.email || !userData.password) {
        throw new HttpException('Nome, email e senha são obrigatórios', HttpStatus.BAD_REQUEST);
      }

      // Verificar se email já existe
      const existingUser = await this.usersService.findByEmail(userData.email);
      if (existingUser) {
        throw new HttpException('Email já cadastrado', HttpStatus.CONFLICT);
      }

      return await this.usersService.create(userData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // PUT /users/:id - Atualizar usuário
  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
    try {
      const user = await this.usersService.update(parseInt(id), userData);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao atualizar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // DELETE /users/:id - Deletar usuário
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.usersService.delete(parseInt(id));
      if (!deleted) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro ao deletar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 