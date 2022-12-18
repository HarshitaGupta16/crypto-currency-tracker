import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignnItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

// to write currency as comma separated
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const classes = useStyles();
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
    console.log(trending);
    console.log(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.price_change_percentage_24h)}
        </span>
      </Link>
    );
  });

  //   const items = trending.map((tr) => <img src={tr.image} />);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
