import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import SparklineChart from "./SparklineChart";
import { ModifiedBookingData } from "../types/types";

describe("SparklineChart component", () => {
  it("renders correctly with data", async () => {
    const data: ModifiedBookingData[] = [
        {
            hotel: "Resort Hotel",
            arrival_date_year: "2015",
            arrival_date_month: "July",
            arrival_date_day_of_month: "1",
            adults: "2",
            children: "0",
            babies: "0",
            country: "PRT",
            date: new Date("July 1, 2015"),
          },
          {
            hotel: "Resort Hotel",
            arrival_date_year: "2015",
            arrival_date_month: "July",
            arrival_date_day_of_month: "1",
            adults: "3",
            children: "1",
            babies: "0",
            country: "PRT",
            date: new Date("July 1, 2015"),
          }
    ];

    const dateRange = { fromDate: new Date(2015, 0, 1), toDate: new Date(2023, 11, 31) };

    render(<SparklineChart data={data} dateRange={dateRange} />);

    await waitFor(() => {
      expect(screen.getByText("Total Adults")).toBeInTheDocument();
      expect(screen.getByText("Total Children")).toBeInTheDocument();
      
    });
  });

 
   
    
});
