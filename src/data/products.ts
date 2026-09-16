export interface Product {
  type: string;
  shape: string;
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
}