// app.js
const express = require("express");
const fs = require("fs");
const csvtojson = require("csvtojson");
const cors = require("cors");
const app = express();
const port = 3000;

const jsonFilePath = "data/hotel_bookings_1000.json";
const csvFilePath = "data/hotel_bookings_1000.csv";

if (!fs.existsSync(jsonFilePath)) {
  csvtojson()
    .fromFile(csvFilePath)
    .then((jsonArrayObj) => {
      fs.writeFileSync(
        jsonFilePath,
        JSON.stringify(
          jsonArrayObj,
          (key, value) => {
            return value === "" ? undefined : value;
          },
          2
        )
      );
      console.log("CSV converted to JSON successfully");
    });
}

app.use(cors());

app.get("/bookings", (req, res) => {
    const data= fs.readFileSync(jsonFilePath);
    const bookings= JSON.parse( data);
  res.status(200).json({
    data: bookings
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
