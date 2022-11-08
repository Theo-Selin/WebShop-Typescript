import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { ReactElement, useState } from "react";
import AddressForm from "../components/AddressForm";
import BaseLayout from "../components/BaseLayout";
import CheckoutProduct from "../components/CheckoutProduct";

const Orders = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <main className="mx-auto my-24 max-w-5xl pb-24">
      <div className="mx-5 md:mx-8">
        <CheckoutProduct />
        <div className="my-12 mt-6 ml-auto w-full">
          <div className="divide-y divide-gray-300">
            <div className="pb-4">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>456:-</p>
              </div>
              <div className="flex justify-between">
                <p>Weight:</p>
                <p>456kg</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-x-1 lg:flex-row">
                  Estimated tax for:{" "}
                  <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                    Enter Address
                    <ChevronDownIcon className="h-6 w-6" />
                  </p>
                </div>
                <p>tax amount</p>
              </div>
              {visible && visible === true && <AddressForm />}
            </div>
            <div className="flex justify-between pt-4 text-xl font-semibold">
              <h4>Total</h4>
              <h4>456:-</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

Orders.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Orders;
