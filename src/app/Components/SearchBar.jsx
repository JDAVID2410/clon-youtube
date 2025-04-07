import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import useSearchStore from "@/store/SearchStore";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { setSearchTerm } = useSearchStore();

  const handleSearch = () => {
    setSearchTerm(searchQuery.toLowerCase()); 
  };

  return (
    <div className="flex items-center relative w-full max-w-xl">
      {!searchOpen ? (
        <>
          <input
            type="text"
            placeholder="Buscar"
            className="border border-gray-300 px-4 py-2 rounded-full w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="absolute right-12 text-gray-600" onClick={handleSearch}>
            <AiOutlineSearch size={20} />
          </button>
          <button className="ml-5 text-gray-600">
            <FaMicrophone size={18} />
          </button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(false)}>
            <AiOutlineClose size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
