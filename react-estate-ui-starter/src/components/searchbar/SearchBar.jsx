import { useState } from "react";
import "./searchBar.scss";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchTypeHandler = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            className={query.type === type ? "active" : ""}
            key={type}
            onClick={() => switchTypeHandler(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          className=""
          name="location"
          placeholder="City Location"
        />
        <input
          type="number"
          className=""
          min={0}
          max={10000000}
          name="minPrice"
          placeholder="Min Price"
        />
        <input
          type="number"
          className=""
          min={0}
          max={10000000}
          name="maxPrice"
          placeholder="Max Price"
        />
        <button>
          <img src="/search.png" alt="search image" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
