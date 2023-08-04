import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finHub from "../api/finHub";
import { StockChart } from "../components/StockChart";
import { StockInfo } from "../components/StockInfo";

const formatData = (data) => {
  return data.t.map((ele, index) => {
    return {
      x: ele * 1000,
      y: data.c[index].toFixed(2),
    };
  });
};
export const StockDetailPage = () => {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;
      try {
        const responses = await Promise.all([
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {}
    };
    fetchData();
  }, [symbol]);

  return (
    <>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockInfo symbol={symbol}/>
        </div>
      )}
    </>
  );
};
