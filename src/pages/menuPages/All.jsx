import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import menuData from "../../utils/mockMenu.json"; // 🔹 Menu items JSON
import Item from "../../components/Item";
import { setTable } from "../../redux/tableSlice";
import { setStore } from "../../redux/storeSlice"; // create this slice if not already

const All = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // 🔹 Redux state
  const searchQuery = useSelector((state) => state.search?.query || "");
  const storeId = useSelector((state) => state.store?.storeId);
  const tableNumber = useSelector((state) => state.table?.tableNumber);

  // 🔹 Parse storeId & tableNumber from QR code URL on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // 🔹 If using encoded QR
    const encoded = params.get("data");

    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));

        if (decoded.store) dispatch(setStore(decoded.store));
        if (decoded.table) dispatch(setTable(Number(decoded.table)));

        return; // stop here if encoded exists
      } catch (err) {
        alert("Invalid QR data");
      }
    }
  }, [location.search, dispatch]);

  console.log(storeId, tableNumber);

  // 🔹 Filter items based on search
  const filteredItems = menuData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 🔹 Shuffle filtered items
  const shuffledItems = [...filteredItems].sort(() => 0.5 - Math.random());

  return (
    <div className="grid grid-cols-2 gap-4 mt-4 mb-24">
      {shuffledItems.length === 0 ? (
        <p className="col-span-2 text-center text-gray-500 mt-10">
          No items found
        </p>
      ) : (
        shuffledItems.map((item) => <Item key={item.id} {...item} />)
      )}
    </div>
  );
};

export default All;
