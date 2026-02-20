import React, { useState } from "react";
import { User, X, MapPin } from "lucide-react"; // Added MapPin icon
import { useSelector } from "react-redux";
import storeData from "../../utils/store.json"; // 🔹 Import your store JSON

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Redux: get storeId and tableNumber (from QR or default)
  const storeId = useSelector((state) => state.store?.storeId || null);
  const tableNumber = useSelector((state) => state.table?.tableNumber || null);
  const cartItems = useSelector((state) => state.cart.items);

  // 🔹 Map storeId to storeData
  const currentStore = storeData.find((store) => store.id === storeId) || {
    name: "Demo Store",
    location: "Searching...",
  };

  // 🔹 Split store name into two parts for styling (like Car + Ture)
  const storeNameParts = currentStore.name.split(" ");

  return (
    <>
      {/* Top Bar */}
      <div className="w-full bg-white px-3 pt-2 pb-2 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            {storeNameParts[0]}
            <span className="text-red-500">
              {storeNameParts.slice(1).join(" ")}
            </span>
          </h1>

          {/* Location instead of static text */}
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <MapPin size={14} className="text-red-500" />
            {currentStore.location}
          </p>
        </div>

        {/* Profile Icon */}
        <div
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center cursor-pointer"
        >
          <User className="text-red-500" size={20} />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-20 right-0 w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 rounded-l-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Store Details</h2>
          <X
            size={20}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Store Details */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Table Number</p>
            <p className="font-medium">{tableNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Items in Cart</p>
            <p className="font-medium">{cartItems.length}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Store Name</p>
            <p className="font-medium">{currentStore.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{currentStore.location}</p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default TopBar;
