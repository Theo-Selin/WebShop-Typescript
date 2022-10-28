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

interface CartItem {
  productId: string;
  quantity: number;
};
interface CartStatus {
  Active: 'active',
  Registered: 'registered',
  InProgress: 'inProgress',
  InDelivery: 'inDelivery',
  Delivered: 'delivered',
}
interface Cart {
  _id?: string
  productId: string
  products: CartItem[];
  status: CartStatus;
  user: string;
  deliveryAdress: DeliveryAddress;
}