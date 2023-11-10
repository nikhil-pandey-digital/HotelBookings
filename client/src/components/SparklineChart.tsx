import { LineChart, Line,Tooltip } from "recharts";
import { ModifiedBookingData, sparklineType } from "../types/types";

const processData = (data: ModifiedBookingData[],dateRange:{fromDate:Date,toDate:Date}) => {
  const reducedData = data.filter((entry=>{
    return  (entry.date.getTime()) >= dateRange.fromDate.getTime() && (entry.date.getTime()) <= dateRange.toDate.getTime();
   } )).reduce(function (
    accumulator: sparklineType[],
    currentValue: ModifiedBookingData
  ) {
    const existingObject = accumulator.find(function (obj) {
      return obj.date.getTime() === currentValue.date.getTime();
    });

    if (existingObject) {
      existingObject.totalAdults += parseInt(currentValue.adults);
      existingObject.totalChildren += parseInt(currentValue.children);
    } else {
      accumulator.push({
        date: currentValue.date,
        totalAdults: parseInt(currentValue.adults),
        totalChildren: parseInt(currentValue.children),
      });
    }

    return accumulator;
  },
  []);

//   console.log(reducedData);
  return reducedData;
};

const SparklineChart: React.FC<{ data: ModifiedBookingData[],dateRange:{fromDate:Date,toDate:Date} }> = ({
  data, dateRange
}) => {
  const processedData = processData(data,dateRange);
  return (
    <>
      <div>
        <h1>Total Adults</h1>
        <p>
          {processedData
            .map((entry) => entry.totalAdults)
            .reduce((a, b) => a + b, 0)}
        </p>
      </div>

      <LineChart
        width={200}
        height={50}
        data={processedData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="totalAdults"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
        <Tooltip />
      </LineChart>

      <div>
        <h1>Total Children</h1>
        <p>
          {processedData
            .map((entry) => entry.totalChildren)
            .reduce((a, b) => a + b, 0)}
        </p>
      </div>

      <LineChart
        width={200}
        height={50}
        data={processedData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <Line
          type="monotone"
          dataKey="totalChildren"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
        />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default SparklineChart;
