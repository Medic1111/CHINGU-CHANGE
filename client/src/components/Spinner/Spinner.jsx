import Portal from "../Portal/Portal";
import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <Portal>
      <div className={classes.spinner}></div>
    </Portal>
  );
};

export default Spinner;
