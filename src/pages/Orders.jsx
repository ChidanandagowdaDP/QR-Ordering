import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { X } from "lucide-react";
import { clearOrders } from "../redux/orderSlice";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
    setCheckedOut(true); // hide button
  };

  if (orders.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No confirmed orders found.
      </div>
    );
  }

  return (
    <>
      {/* ✅ Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white  flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl p-8  border border-gray-200 text-center mx-4 shadow-xl flex flex-col justify-center">
            {/* Close Icon */}
            <button
              onClick={() => {
                setShowModal(false);
                dispatch(clearOrders());
                setCheckedOut(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h3 className="text-2xl font-extrabold text-green-600">
              THANK YOU 🙏
            </h3>

            <p className="text-gray-600 mt-5 text-base leading-relaxed">
              Your checkout has been completed successfully!
            </p>
          </div>
        </div>
      )}

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
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-1"
                >
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

        {/* ✅ Hide checkout button after clicking */}
        {!checkedOut && (
          <button
            onClick={handleCheckout}
            className="bg-red-500 text-white w-full px-4 py-2 rounded mt-4 text-xl"
          >
            Check Out
          </button>
        )}
      </div>
    </>
  );
};

export default Orders;
