interface GlobalContent {
  userInfo: User | null;
  setUserInfo?: React.Dispatch<React.SetStateAction<User | null>>;
}

interface Category {
  _id?: string;
  name: string;
  slug: string;
}

interface Product {
  _id?: string;
  name: string;
  description: string;
  weight: number;
  price: number;
  manufacturer: string;
  images: Upload[];
  category: Category;
}

interface CartItem {
  productId: Product;
  quantity: number;
}
interface CartStatus {
  Active: "active";
  Registered: "registered";
  InProgress: "inProgress";
  InDelivery: "inDelivery";
  Delivered: "delivered";
}
interface Cart {
  _id?: string;
  products: CartItem[];
  status: string;
  totalPrice: number;
  totalWeight: number;
  deliveryCost: number;
  user: string;
  deliveryAddress: Address;
  createdAt: string;
}

interface User {
  _id: ObjectId;
  fullName: string;
  password: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: Address;
  role: AccountRole;
  activeCart: Cart;
}

interface Address {
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
}

interface Upload {
  _id: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  path: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}
