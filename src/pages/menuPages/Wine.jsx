import React from "react";
import menuData from "../../utils/mockMenu.json";
import Item from "../../components/Item";

const Wine = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 mb-25">
      {menuData
        .filter((item) => item.category === "wine")
        .map((item) => (
          <Item key={item.id} {...item} />
        ))}
    </div>
  );
};

export default Wine;
