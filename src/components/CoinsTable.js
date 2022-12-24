import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import {
  Container,
  LinearProgress,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
}));

const CoinsTable = () => {
  const { currency, symbol } = CryptoState();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };
  console.log("coins", coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Crypto Currency Prices by Market Caps
        </Typography>
        <TextField
          variant="outlined"
          label="Search For a Cypto Currency"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(event) => setSearch(event.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "turquoise" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "turquoise" }}>
                <TableRow>
                  {["Coin", "Price", "24th Change", "Market Cap"].map(
                    (heading) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                        key={heading}
                        align={heading === "Coin" ? "" : "right"}
                      >
                        {heading}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  console.log("profit");

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ display: "flex", gap: 15 }}
                      >
                        <img
                          src={row.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit ? "rgb(14,203,129)" : "red",
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(row.market_cap).slice(0, -6)}M
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
