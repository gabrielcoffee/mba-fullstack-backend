import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Nenhum arquivo enviado', HttpStatus.BAD_REQUEST);
    }
    return { 
      filename: file.filename,
      imageUrl: `/uploads/${file.filename}` 
    };
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