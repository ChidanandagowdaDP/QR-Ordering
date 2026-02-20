import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; // remove after testing
import { clearOrders } from "../redux/orderSlice"; //remove after testing

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  if (orders.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No confirmed orders found.
      </div>
    );
  }

  return (
    <div className="p-4 pb-24 space-y-6">
      <h2 className="text-xl font-semibold">Your Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border rounded-xl p-4 shadow-md">
          <div className="text-sm text-gray-600 mb-2">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Table:</strong> {order.table}
            </p>
            <p>
              <strong>Time:</strong> {order.time}
            </p>
          </div>

          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-1">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 font-semibold">Total: ₹{order.total}</div>
        </div>
      ))}
      <button
        onClick={() => dispatch(clearOrders())}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4" ///remove after testing
      >
        Clear All Orders (Testing)
      </button>
    </div>
  );
};

export default Orders;
