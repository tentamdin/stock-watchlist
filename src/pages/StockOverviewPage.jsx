import React from "react";
import { Search } from "../components/Search";
import { StockList } from "../components/StockList";

export const StockOverviewPage = () => {
  return (
    <>
      <h1>StockOverviewPage</h1>
      <Search/>
      <StockList/>
    </>
  );
};
