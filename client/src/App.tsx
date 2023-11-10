import { useEffect, useState } from "react";
import { BookingData, ModifiedBookingData } from "./types/types";
import TimeSeriesChart from "./components/TimeSeriesChart";
import ColumnChart from "./components/ColumnChart";
import SparklineChart from "./components/SparklineChart";
import DatePicker from "./components/DateRangePicker";
const API = "http://localhost:3000/bookings";

export default function App() {

  const [bookingsData, setBookingsData] = useState<ModifiedBookingData[]>([]);

  const [fromDate, setFromDate] = useState<Date>(new Date(2015,0,1));
  const [toDate, setToDate] = useState<Date>(new Date(2023,11,31));


  useEffect(() => {
    const getBookingsData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        const modifiedData: ModifiedBookingData[] = data.data.map(
          (entry: BookingData) => ({
            ...entry,
            date: new Date(
              `${entry.arrival_date_month} ${entry.arrival_date_day_of_month},${entry.arrival_date_year}`
            ),
          })
        );

        setBookingsData(modifiedData);
      } catch (error) {
        console.log(error);
      }
    };
    getBookingsData();
  }, []);

  const handleDateFilterChange = (fromDate: Date, toDate: Date) => {
    setFromDate(fromDate);
    setToDate(toDate);
  }

  return (
    <>
      <DatePicker onDateFilterChange={handleDateFilterChange}/>
      <h1 className="text-3xl font-san underline ">Visitors per Day</h1>
      <TimeSeriesChart data={bookingsData}  dateRange={{fromDate,toDate}}/>

      <h1 className="mt-2 text-3xl font-san underline ">
        Vistiors per Country
      </h1>
      <ColumnChart data={bookingsData} dateRange={{fromDate,toDate}}/>

      <SparklineChart data={bookingsData} dateRange={{fromDate,toDate}}/>
    </>
  );
}
