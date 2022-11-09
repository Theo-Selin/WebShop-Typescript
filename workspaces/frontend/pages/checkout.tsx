import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import Button from "../components/Button";
import CheckoutProduct from "../components/CheckoutProduct";
import { ChevronDownIcon } from "@heroicons/react/outline";
import useUser from "../utils/hooks/useUser";
import BaseLayout from "../components/BaseLayout";
import useCart from "../utils/hooks/useCart";
import AddressForm from "../components/AddressForm";
import PostCheckout from "../components/PostCheckout";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-hot-toast";

interface Values {
  streetAddress: string;
  zipCode: string;
  city: string;
  country: string;
}

const Checkout = () => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const { cart, checkoutOrder } = useCart();
  const products = cart?.products;
  const weight =
    products &&
    products.reduce(
      (sum, product) => sum + product.productId.weight * product.quantity,
      0
    );
  const price =
    products &&
    products.reduce(
      (sum, product) => sum + product.productId.price * product.quantity,
      0
    );

  useEffect(() => {
    if (!user) {
      router.push("/users/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (isCheckedOut) {
    return <PostCheckout />;
  }

  return (
    <main className="mx-auto max-w-5xl pb-24">
      <Formik
        initialValues={{
          streetAddress: user.deliveryAddress?.streetAddress || "",
          zipCode: user.deliveryAddress?.zipCode || "",
          city: user.deliveryAddress?.city || "",
          country: user.deliveryAddress?.country || "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          checkoutOrder.mutate(
            { deliveryAddress: { ...values } },
            {
              onSuccess: () => {
                setIsCheckedOut(true);
                toast.success("Your order has been placed!", {
                  position: "top-center",
                  className: "text-sm",
                });
                setSubmitting(false);
              },
              onError: () => {
                toast.error(
                  "Something went wrong, please double-check the address!",
                  {
                    position: "top-center",
                    className: "text-sm",
                  }
                );
              },
            }
          );
        }}
      >
        <Form>
          <div className="flex flex-col items-center px-5">
            <h1 className="mt-20 text-3xl font-semibold lg:text-4xl">
              {cart && cart.products.length > 0
                ? "Review your cart"
                : "Your cart is empty"}
            </h1>
            <p className="my-4">Free delivery and returns</p>
            <Button
              title="Continue shopping"
              onClick={() => router.push("/")}
            />
          </div>
          {cart && cart.products.length > 0 && (
            <div className="mx-5 md:mx-8">
              <CheckoutProduct />
              <div className="my-12 mt-6 ml-auto w-full">
                <div className="divide-y divide-gray-300">
                  <div className="pb-4">
                    <div className="flex justify-between">
                      <p>Subtotal:</p>
                      <p>{price}:-</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Weight:</p>
                      <p>{weight}kg</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping:</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-x-1 lg:flex-row">
                        Estimated tax for:{" "}
                        <p
                          onClick={() =>
                            visible && visible === true
                              ? setVisible(false)
                              : setVisible(true)
                          }
                          className="flex cursor-pointer items-end text-blue-500 hover:underline"
                        >
                          Enter Address
                          <ChevronDownIcon className="h-6 w-6" />
                        </p>
                      </div>
                      <p>tax amount</p>
                    </div>
                    {visible && <AddressForm />}
                  </div>
                  <div className="flex justify-between pt-4 text-xl font-semibold">
                    <h4>Total</h4>
                    <h4>{price}:-</h4>
                  </div>
                </div>
                <div className="my-14 space-y-4">
                  <h4 className="text-xl font-semibold">
                    Check out your purchase
                  </h4>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                      <h4 className="mb-4 flex flex-col text-xl font-semibold">
                        <span>Pay Directly</span>
                        <span>with Swish</span>
                      </h4>
                      <Button title="Checkout" type="submit" />
                      <p className="mt-2 max-w-[300px] text-[12px]">
                        We do not save any kind of information given to us,
                        whether it be your address or contact information,
                        unless it&apos;s valuable information that could
                        generate us more money in the end
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 text-center md:order-2">
                      <h4 className="mb-4 flex flex-col text-xl font-semibold">
                        <span>Pay Monthly</span>
                        <span>with Klarna</span>
                      </h4>
                      <Button
                        noIcon
                        title="Check out with Klarna"
                        type="submit"
                      />
                      <p className="mt-2 max-w-[300px] text-[12px]">
                        We do not save any kind of information given to us,
                        whether it be your address or contact information,
                        unless it&apos;s valuable information that could
                        generate us more money in the end
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </main>
  );
};

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Checkout;
