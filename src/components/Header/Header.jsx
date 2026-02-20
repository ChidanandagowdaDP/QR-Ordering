import React, { useState } from "react";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import Banner from "./Banner";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // This function will run when user clicks search
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);

    // Later you can:
    // - filter products
    // - navigate to search page
    // - call API
  };

  return (
    <div>
      <TopBar />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <Banner />
    </div>
  );
};

export default Header;
