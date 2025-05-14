// User types
export interface User {
  id?: number;
  username: string;
  email: string;
  phone: string;
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
} 