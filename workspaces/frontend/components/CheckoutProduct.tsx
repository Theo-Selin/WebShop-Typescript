import { ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Currency from "react-currency-format";
import toast from "react-hot-toast";

// Need a way to access product details from CartItem
interface Props {
  items: CartItem[];
  id: string;
}

const CheckoutProduct = ({ id, items }: Props) => {
  const removeItemFromCart = () => {
    toast.error(`item removed from cart`, {
      position: "top-center",
      className: "text-sm",
    });
  };

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
      <div className="relative h-44 w-44">
        <Image src="" layout="fill" objectFit="contain"></Image>
      </div>

      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">Item name</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              Items quantity <ChevronDownIcon />
            </p>
          </div>
          <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
            Show product details
            <ChevronDownIcon className="h-6 w-6" />
          </p>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
              quantity="reduce((total, item) => total + item.price, 0)"
              currency="USD"
            />
          </h4>
          <button
            onClick={removeItemFromCart}
            className="text-blue-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
