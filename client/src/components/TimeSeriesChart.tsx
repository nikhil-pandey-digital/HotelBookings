import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { ModifiedBookingData, visitorsPerDay } from "../types/types";

const filterData = (data: ModifiedBookingData[],dateRange:{fromDate:Date,toDate:Date}) => {
  

  const formattedData: visitorsPerDay[] = data.filter((entry=>{
   return  (entry.date.getTime()) >= dateRange.fromDate.getTime() && (entry.date.getTime()) <= dateRange.toDate.getTime();
  } )).map((entry) => ({
    date: entry.date,
    totalVisitors:
      parseInt(entry.adults) +
      parseInt(entry.children) +
      parseInt(entry.babies),
  }));

  const reducedData = formattedData.reduce(function (
    accumulator: visitorsPerDay[],
    currentValue: visitorsPerDay
  ) {
    const existingObject = accumulator.find(function (obj) {
      return obj.date.getTime() === currentValue.date.getTime();
    });

    if (existingObject) {
      existingObject.totalVisitors += currentValue.totalVisitors;
    } else {
      accumulator.push({
        date: currentValue.date,
        totalVisitors: currentValue.totalVisitors,
      });
    }
   
    
    return accumulator;
  },
  []);
   
    const representableData= reducedData.map((entry) => ({
          date: entry.date.toLocaleDateString('en-US', { day: "2-digit", month: "short" }),
          totalVisitors: entry.totalVisitors,
    }));

    // console.log(representableData);
  return representableData;
};

const TimeSeriesChart: React.FC<{ data: ModifiedBookingData[], dateRange:{fromDate:Date,toDate:Date} }> = ({
  data,dateRange
}) => {
  
  const processedData = filterData(data,dateRange);
  // console.log(processedData);
  return (
    <LineChart
      width={800}
      height={500}
      data={processedData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{ angle:"-45", textAnchor: 'end', verticalAlign: 'middle' } as {angle:string, textAnchor:string}}  />
      <YAxis dataKey={"totalVisitors"} label={{value:'Visitors' ,angle:"-90", position:"insideLeft"}}/>
      <Tooltip />
      <Legend align="center" verticalAlign="bottom"  />
      <Line type="monotone" dataKey="totalVisitors" stroke="#8884d8" />
    </LineChart>
  );
};

export default TimeSeriesChart;
