import React from "react";
import classes from "./Portal.module.css";
import ReactDOM from "react-dom";
const root = document.getElementById("portal");

const Wrapper = (props) => {
  return <article className={classes.article}>{props.children}</article>;
};

const Portal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Wrapper>{props.children}</Wrapper>, root)}
    </React.Fragment>
  );
};

export default Portal;
