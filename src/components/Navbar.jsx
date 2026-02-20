import { NavLink } from "react-router-dom";

const categories = [
  { name: "All", path: "/" },
  { name: "Food", path: "food" },
  { name: "Cool Drinks", path: "cooldrinks" },
  { name: "Beer", path: "beer" },
  { name: "Whisky", path: "whisky" },
  { name: "Wine", path: "wine" },
];

const Navbar = () => {
  return (
    <div className="mt-3  sticky top-1  ">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {categories.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                isActive
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
