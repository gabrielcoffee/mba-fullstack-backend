import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}

  // Buscar todos os usuários
  async findAll(): Promise<User[]> {
    const result = await this.database.query('SELECT * FROM users ORDER BY id');
    return result.rows;
  }

  // Buscar usuário por ID
  async findById(id: number): Promise<User | null> {
    const result = await this.database.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // Buscar usuário por email (para login)
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  // Criar um novo usuário
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const result = await this.database.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [userData.name, userData.email, userData.password]
    );
    return result.rows[0];
  }

  // Atualizar um usuário existente
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    const result = await this.database.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [userData.name, userData.email, userData.password, id]
    );
    return result.rows[0] || null;
  }

  // Deletar um usuário
  async delete(id: number): Promise<boolean> {
    const result = await this.database.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
} 