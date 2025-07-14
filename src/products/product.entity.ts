export class Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  status: 'active' | 'inactive' | 'sold';
  userId: number; // Quem criou o produto
  createdAt: Date;
  updatedAt: Date;
} 