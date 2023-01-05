import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/Banner/Carousel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    // down means if it is less than the medium screen then flexDirection: column & alignItems: center
    "@media (max-width: 900px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    "@media (max-width: 900px)": {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold !important",
    marginBottom: "20px !important",
    fontFamily: "Montserrat !important",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    // Making it responsive
    "@media(max-width:900px)": {
      display: "flex",
      justifyContent: "space-around",
    },
    "@media(max-width:600px)": {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media(max-width:0px)": {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const { id } = useParams();
  const [coinDetail, setCoinDetail] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoinDetail(data);
  };

  useEffect(() => {
    fetchCoin();
  });
  console.log(coinDetail);
  const classes = useStyles();

  if (!coinDetail)
    return <LinearProgress style={{ backgroundColor: "turquoise" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coinDetail?.image.large}
          alt={coinDetail?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coinDetail?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {/* take the english part off description that is before fullstop */}
          {ReactHtmlParser(coinDetail?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coinDetail?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coinDetail?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coinDetail?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      {/* chart */}
      <CoinInfo coinDetail={coinDetail} />
    </div>
  );
};

export default CoinPage;
