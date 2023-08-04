import React from "react";
import { useParams } from "react-router-dom";

export const StockDetailPage = () => {
  const { symbol } = useParams();
  return (
    <>
      <h1>StockDetailPage {symbol}</h1>
    </>
  );
};
