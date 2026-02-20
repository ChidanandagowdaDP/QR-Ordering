import React from "react";
import menuData from "../../utils/mockMenu.json";
import Item from "../../components/Item";

const Whisky = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 mb-25">
      {menuData
        .filter((item) => item.category === "whisky")
        .map((item) => (
          <Item key={item.id} {...item} />
        ))}
    </div>
  );
};

export default Whisky;
