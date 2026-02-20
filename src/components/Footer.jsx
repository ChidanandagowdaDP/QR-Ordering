import { Menu, ShoppingCart, Package } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQty = cartItems.reduce(
    (total, item) => total + (item.qty || 0),
    0,
  );

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="relative w-full max-w-md">
        {/* Floating Cart Button */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => navigate("/cart")}
            className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center
                       border-3 border-white shadow-lg
                       transition-transform duration-200 active:scale-95"
          >
            <ShoppingCart className="text-white" size={22} />

            {totalQty > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-white text-red-500 text-[10px] font-bold 
                               rounded-full w-5 h-5 flex items-center justify-center shadow"
              >
                {totalQty}
              </span>
            )}
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <div
          className="bg-red-500 text-white h-12 rounded-t-3xl 
                        flex items-center justify-between px-12 shadow-md"
        >
          <button
            onClick={() => navigate("/")}
            className="hover:scale-110 transition-transform duration-200"
          >
            <Menu size={22} />
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="hover:scale-110 transition-transform duration-200"
          >
            <Package size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
