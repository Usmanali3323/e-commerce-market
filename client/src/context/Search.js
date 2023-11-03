import { useState, useContext, useEffect, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    product: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom Hook

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
