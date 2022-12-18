import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.jpg)",
  },
  bannerContainer: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContainer}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the information regarding Crypto Currency
          </Typography>
        </div>
      </Container>
      <Carousel />
    </div>
  );
};

export default Banner;
