import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../shared/database.service';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private database: DatabaseService) {}

  async findAll(): Promise<Product[]> {
    const result = await this.database.query('SELECT * FROM products ORDER BY id');
    return result.rows;
  }

  async findById(id: number): Promise<Product | null> {
    const result = await this.database.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const result = await this.database.query(
      'INSERT INTO products (title, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [productData.title, productData.description, productData.price, productData.category, productData.imageUrl]
    );
    return result.rows[0];
  }

  async update(id: number, productData: Partial<Product>): Promise<Product | null> {
    const result = await this.database.query(
      'UPDATE products SET title = COALESCE($1, title), description = COALESCE($2, description), price = COALESCE($3, price), category = COALESCE($4, category), image_url = COALESCE($5, image_url), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [productData.title, productData.description, productData.price, productData.category, productData.imageUrl, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.database.query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
} 