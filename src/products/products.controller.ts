import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findById(parseInt(id));
    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post()
  async create(@Body() productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    if (!productData.title || !productData.price) {
      throw new HttpException('Título e preço são obrigatórios', HttpStatus.BAD_REQUEST);
    }
    return await this.productsService.create(productData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product> {
    const product = await this.productsService.update(parseInt(id), productData);
    if (!product) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.productsService.delete(parseInt(id));
    if (!deleted) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'Produto deletado com sucesso' };
  }
} 