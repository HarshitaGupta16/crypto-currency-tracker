import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat !important",
    fontWeight: "bold !important",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const classes = useStyles();

  const history = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              onClick={() => history("/")}
              variant="h6"
            >
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
