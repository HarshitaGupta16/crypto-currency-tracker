import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const useStyles = makeStyles(() => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [darkTheme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const CoinInfo = ({ coinDetail }) => {
  const [days, setDays] = useState(1);
  const [historicalData, setHistoricalData] = useState();

  const { currency } = CryptoState();
  const classes = useStyles();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart(coinDetail.id, days, currency)
    );
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  console.log("his:", historicalData?.prices);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* chart */}
        {!historicalData ? (
          <CircularProgress
            style={{ color: "turquoise" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  // converting data on 0th index that is date to date format
                  let date = new Date(coin[0]);
                  let minutes =
                    date.getMinutes() < 10
                      ? `0${date.getMinutes()}`
                      : date.getMinutes();
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${minutes} PM`
                      : `${date.getHours()}:${minutes} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days in ${currency} )`,
                    borderColor: "turquoise",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            {/* buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 20,
                width: "100%",
              }}
            >
              {ChartDays.map((day) => (
                <SelectButton
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
