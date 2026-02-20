import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Item = ({ id, name, price, image, category }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md p-3 flex flex-col h-full">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-28 object-cover rounded-lg"
      />

      {/* Name */}
      <h3 className="mt-2 text-sm font-semibold line-clamp-2">{name}</h3>

      {/* Spacer to push button down */}
      <div className="flex-1"></div>

      {/* Price + Button */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-red-500 font-bold text-sm">₹{price}</p>

        <button
          onClick={() =>
            dispatch(addToCart({ id, name, price, image, category }))
          }
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Item;
