interface Category {
  _id?: string;
  name: string;
}

interface Product {
  _id?: string
  name: string;
  description: string;
  weight: number;
  price: number;
  manufacturer: string;
  images: string[];
  category: Category
}