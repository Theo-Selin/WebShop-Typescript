import { ShoppingCartIcon, PencilAltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import useCart from "../utils/hooks/useCart";
import useUser from "../utils/hooks/useUser";

interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  const { user } = useUser();
  const { addProduct } = useCart();

  const addItemToCart = (productId: string) => {
    addProduct.mutate(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart`, {
            position: "top-center",
            className: "text-sm",
          });
        },
      }
    );
  };

  return (
    <div className="h-68 flex select-none flex-col items-center space-y-3 rounded-xl bg-[#ffffff] p-8 md:h-[500px] md:w-[350px] md:p-10">
      <div className="relative h-64 w-48 md:h-72">
        {product.images.length ? (
          <Link href={`/products/${product._id}`}>
            <a>
              {/* Next Image vs Docker a 100 part saga........*/}
              <picture>
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].path}`}
                  alt={`${product.name}$ cover image`}
                  className="cursor-pointer"
                  style={{ width: "100%" }}
                  // layout="fill"
                  // objectFit="contain"
                />
              </picture>
            </a>
          </Link>
        ) : null}
      </div>

      <div className="flex flex-col items-center space-y-2 text-xl md:text-2xl">
        <Link href={`/products/${product._id}`}>{product.name}</Link>
        <p className="text-pink-600">{product.price}:-</p>
      </div>

      <div className="flex gap-x-10">
        {user && user.role === "admin" && (
          <Link href={`/products/edit-product/${product._id}`}>
            <div className="editProductBtn">
              <PencilAltIcon className="h-6 w-6 text-gray-400" />
            </div>
          </Link>
        )}
        <div
          className="addToCartBtn"
          onClick={() => product._id && addItemToCart(product._id)}
        >
          <ShoppingCartIcon className="h-6 w-6 text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Product;
