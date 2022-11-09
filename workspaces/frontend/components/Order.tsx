import { ChevronDownIcon } from "@heroicons/react/outline";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { prettyPrintStatus, Status } from "../utils/helpers";
import useAdminOrder from "../utils/hooks/useAdminOrder";
import Button from "./Button";
import OrderStatusForm from "./OrderStatusForm";

type Props = {
  order: Cart;
  isAdmin: boolean;
};

const Order = ({ order, isAdmin }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const orderDate = new Date(order.createdAt).toLocaleDateString();

  const openDetails = () => setShowDetails((show) => !show);

  return (
    <div>
      <div
        className="flex justify-between pb-2 text-xl font-semibold"
        onClick={openDetails}
      >
        <div className="flex">
          <button className="ml mr-2 h-5 w-5">
            <ChevronDownIcon />
          </button>
          <p>
            Order - {orderDate}
            <span className="text-lg font-normal">
              {" "}
              ({prettyPrintStatus(order.status as Status)})
            </span>
          </p>
        </div>

        <p>{order.totalPrice + order.deliveryCost}:-</p>
      </div>
      {showDetails ? (
        <div className="ml-8">
          <div></div>
          <div className="flex justify-between pb-2 text-base">
            {isAdmin ? (
              <OrderStatusForm
                id={order._id!}
                status={order.status as Status}
              />
            ) : (
              <>
                <p>Status:</p>
                <p>{order.status}</p>
              </>
            )}
          </div>

          <div className="flex justify-between pb-2">
            <p>Weight:</p>
            <p>{order.totalWeight} kg</p>
          </div>
          <div className="flex justify-between text-xl font-semibold">
            <h3>Address</h3>
          </div>
          <div className="pb-4">
            <p>{order.deliveryAddress?.streetAddress}</p>
            <p>
              {order.deliveryAddress?.zipCode} {order.deliveryAddress?.city}
            </p>
            <p>{order.deliveryAddress?.country}</p>
          </div>
          <div className="divide-y divide-gray-300">
            <div className="flex justify-between text-xl font-semibold">
              <h3>Items</h3>
              <h3>{order.totalPrice + order.deliveryCost}:-</h3>
            </div>
            <div className="pb-4">
              {order.products.map(({ productId, quantity }) => (
                <div key={productId._id} className="flex justify-between">
                  <p>
                    {quantity} x {productId.name}
                  </p>
                  <p>{productId.price * quantity} :-</p>
                </div>
              ))}
            </div>
            <div className="pb-4">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{order.totalPrice} :-</p>
              </div>

              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>{order.deliveryCost} :-</p>
              </div>
            </div>
            <div className="flex justify-between pt-2 pb-8 text-xl font-semibold">
              <h4>Total</h4>
              <h4>{order.totalPrice + order.deliveryCost}:-</h4>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Order;
