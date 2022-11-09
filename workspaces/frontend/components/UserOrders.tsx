import Order from "./Order";

type Props = {
  orders: Cart[];
};

const UserOrders = ({ orders }: Props) => {
  return (
    <div className="mx-auto my-24 max-w-5xl pb-24">
      <div className="mx-5 md:mx-8">
        <h1 className="text-2xl font-semibold">Order history</h1>
        <div className="my-12 mt-6 ml-auto w-full">
          {orders.map((order) => (
            <Order order={order} isAdmin={false} key={order._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
