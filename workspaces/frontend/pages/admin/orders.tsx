import React, { ReactElement } from "react";
import AdminOrders from "../../components/AdminOrders";
import BaseLayout from "../../components/BaseLayout";
import useAdminOrders from "../../utils/hooks/useAdminOrders";

const Admin = () => {
  const { orders } = useAdminOrders();

  if (!orders) {
    return null;
  }

  const payedOrders = orders.filter((order) => order.status !== "active");

  return <AdminOrders orders={payedOrders} />;
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Admin;
