import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import toast from "react-hot-toast";
import useCart from "../utils/hooks/useCart";

const CheckoutProduct = () => {
  const { cart, updateProductQuantity } = useCart();

  const removeItemFromCart = (productId: string) => {
    updateProductQuantity.mutate(
      { productId, quantity: 0 },
      {
        onSuccess: () => {
          toast.error(`item removed from cart`, {
            position: "top-center",
            className: "text-sm",
          });
        },
      }
    );
  };

  return (
    <>
      {cart?.products.map((product) => (
        <div key={product.productId._id}>
          <div className="flex flex-col items-center gap-x-4 border-b border-gray-300 pb-5 text-sm lg:flex-row lg:items-center">
            <div className="relative h-44 w-44">
              {product.productId.images.length > 0 ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.productId.images[0].path}`}
                  alt={`${product.productId.name}`}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              ) : null}
            </div>
            <div className="flex flex-col items-center lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex flex-row gap-x-4 text-lg lg:flex-row lg:text-2xl">
                  <h4 className="font-semibold lg:w-96">
                    {product.productId.name}
                  </h4>
                </div>
              </div>
              <div className="flex flex-row items-end gap-x-4 space-y-4 lg:items-center lg:gap-x-10 lg:space-y-0">
                <p className="flex items-end gap-x-1 text-lg font-semibold">
                  {product.quantity} <ChevronDownIcon className="h-6 w-6 p-1" />
                </p>
                <h4 className="text-xl font-semibold lg:text-2xl">
                  {product.productId.price}:-
                </h4>
                <button
                  onClick={() => removeItemFromCart(product.productId._id!)}
                  className="flex items-center text-blue-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CheckoutProduct;
