export type BookingData = {
  hotel: string;
  arrival_date_year: string;
  arrival_date_month: string;
  arrival_date_day_of_month: string;
  adults: string;
  children: string;
  babies: string;
  country: string;
};

export type ModifiedBookingData = BookingData & {
  date: Date;
};

export type visitorsPerDay = {
  date: Date;
  totalVisitors: number;
};

export type visitorsPerCountry = {
    country: string;
    totalVisitors: number;
};
export type sparklineType={
  date:Date,
  totalAdults:number,
  totalChildren:number,
}

