import React, { useState, useEffect } from "react";
import finHub from "../api/finHub";

export const StockInfo = ({ symbol }) => {
  const [stockInfo, setStockInfo] = useState();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finHub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        console.log(response.data);
        if (isMounted) {
          setStockInfo(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);

  return (
    <>
      {stockInfo && (
        <div className="row border bg-white rounded shawdow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">Name: </span>
              {stockInfo.name}
            </div>
            <div>
              <span className="fw-bold">Country </span>
              {stockInfo.country}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>
              {stockInfo.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockInfo.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockInfo.industry}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
              {stockInfo.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockInfo.marketCapitalization}
            </div>
            <div>
              <span className="fw-bold">Share OutStanding: </span>
              {stockInfo.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">Url: </span>
              <a href={stockInfo.weburl}>{stockInfo.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
