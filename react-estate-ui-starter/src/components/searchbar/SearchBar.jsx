import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";
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

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          name="city"
          id="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          type="number"
          className=""
          min={0}
          max={10000000}
          name="minPrice"
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          className=""
          min={0}
          max={10000000}
          name="maxPrice"
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="search image" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
