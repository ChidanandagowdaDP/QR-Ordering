import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../redux/cartSlice";
import { addOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const tableNumber = useSelector((state) => state.table.tableNumber);
  const hasFoodItem = cartItems.some((item) => item.category === "food");

  const [showModal, setShowModal] = useState(false);
  const [remark, setRemark] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const orderData = {
      id: Date.now(),
      table: tableNumber,
      items: cartItems,
      total: totalAmount,
      remarks: remark,
      time: new Date().toLocaleString(),
    };

    dispatch(addOrder(orderData));

    setShowModal(true);

    setTimeout(() => {
      dispatch(clearCart());
    }, 100);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/orders");
  };

  return (
    <>
      {/*  Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-red bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-lg">
            <h3 className="text-xl font-bold text-green-600">
              Order Placed 🎉
            </h3>
            <p className="text-gray-600 mt-2">
              Your order has been successfully placed!
            </p>

            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg"
            >
              View Orders
            </button>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="h-screen flex items-center justify-center text-gray-500">
          Your Cart is Empty
        </div>
      ) : (
        <div className="p-4 pb-24">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center  pb-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Decrease */}
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    disabled={item.qty === 1}
                    className={`px-2 py-1 rounded ${
                      item.qty === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    -
                  </button>

                  <span className="w-6 text-center font-medium">
                    {item.qty}
                  </span>

                  {/* Increase */}
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-6 border-t pt-4">
            <p className="font-semibold text-lg">Total: ₹{totalAmount}</p>
            <hr className="mt-3" />

            {hasFoodItem && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Remarks
                </label>

                <textarea
                  placeholder="Add special instructions For Food (e.g., less spicy...)"
                  rows={3}
                  onChange={(e) => setRemark(e.target.value)}
                  className="
          w-full 
          p-3 
          rounded-xl 
          border 
          border-gray-300 
          bg-gray-50 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-400 
          transition-all 
          duration-200
          resize-none
        "
                />
              </div>
            )}
            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full bg-red-500  text-white py-3 rounded-lg"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
