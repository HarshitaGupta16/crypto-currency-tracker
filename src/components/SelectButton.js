import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  selectButton: {
    border: "1px solid turquoise",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    "&:hover": {
        backgroundColor: 'turquoise',
        color: 'black'
    },
    width: '22%'
  },
}));

const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles();
  return (
    <span
      onClick={onClick}
      selected={selected}
      className={classes.selectButton}
      style={{ backgroundColor: selected ? "turquoise" : "",
               color: selected ? 'black' : "",
               fontWeight: selected ? 700 : 500 }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
