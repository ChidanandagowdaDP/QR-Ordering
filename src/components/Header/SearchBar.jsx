import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch } from "../../redux/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    dispatch(setSearch(value));
    navigate("/");
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-200 rounded-md px-4 py-2 flex-1 shadow-sm">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search ..."
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm "
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
