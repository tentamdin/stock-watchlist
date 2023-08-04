import React, { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("24h");
  const { day, week, year } = chartData;
  console.log(chartData);

  const changeDateFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };
  const color =
    changeDateFormat()[changeDateFormat().length - 1].y -
      changeDateFormat()[0].y >
    0
      ? "#26C281"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontsize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animation: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: changeDateFormat(),
    },
  ];

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <button
        className={renderButtonSelect("24h")}
        onClick={() => setDateFormat("24h")}
      >
        24h
      </button>
      <button
        className={renderButtonSelect("7d")}
        onClick={() => setDateFormat("7d")}
      >
        7d
      </button>
      <button
        className={renderButtonSelect("1y")}
        onClick={() => setDateFormat("1y")}
      >
        1y
      </button>
    </div>
  );
};
