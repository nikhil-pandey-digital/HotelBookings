import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ModifiedBookingData, visitorsPerCountry } from "../types/types";

const filterVisitersPerCountry = (data: ModifiedBookingData[],dateRange:{fromDate:Date,toDate:Date}) => {
  const formattedData: visitorsPerCountry[] = data.filter((entry=>{
    return  (entry.date.getTime()) >= dateRange.fromDate.getTime() && (entry.date.getTime()) <= dateRange.toDate.getTime();
   } )).map((entry) => ({
    country: entry.country,
    totalVisitors:
      parseInt(entry.adults) +
      parseInt(entry.children) +
      parseInt(entry.babies),
  }));

  const reducedData = formattedData.reduce(function (
    accumulator: visitorsPerCountry[],
    currentValue: visitorsPerCountry
  ) {
    const existingObject = accumulator.find(function (obj) {
      return obj.country === currentValue.country;
    });
    if (existingObject) {
      existingObject.totalVisitors += currentValue.totalVisitors;
    } else {
      accumulator.push({
        country: currentValue.country,
        totalVisitors: currentValue.totalVisitors,
      });
    }
    return accumulator;
  },
  []);

  return reducedData;
};

const CountryColumnChart: React.FC<{ data: ModifiedBookingData[],dateRange:{fromDate:Date,toDate:Date} }> = ({
  data,dateRange
}) => {
  const filteredData = filterVisitersPerCountry(data,dateRange);

  return (
    <BarChart
      width={800}
      height={400}
      data={filteredData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="country" label={{ value: 'Country', position: 'insideBottom', offset: -5 }}/>
      <YAxis label={{ value: 'Visitors', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalVisitors" fill="#8884d8" offset={-20} />
    </BarChart>
  );
};
export default CountryColumnChart;
