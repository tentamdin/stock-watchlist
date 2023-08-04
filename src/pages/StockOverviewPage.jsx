import React from "react";
import { Search } from "../components/Search";
import { StockList } from "../components/StockList";

export const StockOverviewPage = () => {
  return (
    <>
      <div className="text-center mt-5 fw-bold fs-1">Stock Watchlist</div>
      <Search />
      <StockList />
    </>
  );
};
