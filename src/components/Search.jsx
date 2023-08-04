import React, { useState, useEffect, useContext } from "react";
import finHub from "../api/finHub";
import { WatchListContext } from "../context/WatchListContext";
WatchListContext;

export const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStock } = useContext(WatchListContext);

  // fuction to render dropdown based on serach
  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results?.map((result) => {
          return (
            <li
              key={result.symbol}
              className="dropdown-item"
              onClick={() => {
                addStock(result.symbol);
                setSearch("");
              }}
            >
              {result.description}
              {result.symbol}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finHub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response);
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <>
      <div className="w-50 p-5 rounded mx-auto">
        <div className="form-floating dropdown">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <label htmlFor="search">Search</label>
          {renderDropdown()}
        </div>
      </div>
    </>
  );
};
