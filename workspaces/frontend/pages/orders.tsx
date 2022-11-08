import React, { ReactElement } from "react";
import BaseLayout from "../components/BaseLayout";
import UserOrders from "../components/UserOrders";
import useOrders from "../utils/hooks/useOrders";

const Orders = () => {
  const { orders } = useOrders();

  if (!orders) {
    return null;
  }

  return <UserOrders orders={orders} />;
};

Orders.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Orders;
