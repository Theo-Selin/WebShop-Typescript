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
  images: string[];
  category: Category;
}

interface CartItem {
  productId: string;
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
  productId: string;
  products: CartItem[];
  status: CartStatus;
  user: string;
  deliveryAddress: DeliveryAddress;
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
