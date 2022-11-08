type Props = {
  order: Cart;
};

const Order = ({ order }: Props) => {
  return (
    <div>
      <h2 className="pb-2 text-2xl font-semibold">Order</h2>
      <div className="flex justify-between pb-2 text-xl">
        <p>Status:</p>
        <p>{order.status}</p>
      </div>

      <div className="divide-y divide-gray-300">
        <div className="mb-2 flex justify-between">
          <p>Date created:</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
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
            <p>Weight:</p>
            <p>{order.totalWeight} kg</p>
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
  );
};

export default Order;
