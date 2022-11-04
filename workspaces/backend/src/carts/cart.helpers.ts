import { Product } from 'src/products/schemas/products.schema';
import { Cart, DeliveryPlan } from './schemas/cart.schema';

const calculateShippingCost = (totalPrice) => {
  if (totalPrice >= 1000) {
    return DeliveryPlan.Free;
  }
  return DeliveryPlan.Shipping;
};

export const setCartPriceAndWeight = (cart: Cart, products: Product[]) => {
  cart.totalPrice = 0;
  cart.totalWeight = 0;
  cart.products.forEach((product) => {
    cart.totalPrice +=
      products.find((p) => p._id.toString() === product.productId.toString())
        .price * product.quantity;
    cart.totalWeight +=
      products.find((p) => p._id.toString() === product.productId.toString())
        .weight * product.quantity;
  });
  cart.deliveryCost = calculateShippingCost(cart.totalPrice);
};
