import classes from "./FormConvert.module.css";

const FormConvert = () => {
  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>CONVERT</h2>
      <form className={classes.form}>
        <input className={classes.input} type="number" placeholder="AMOUNT" />
        <p className={classes.secP}>FROM</p>
        <input className={classes.input} type="text" placeholder="CURRENCY" />
        <p className={classes.secP}>TO</p>
        <input className={classes.input} type="text" placeholder="CURRENCY" />
        <input className={classes.submit} value="Result" type="submit" />
      </form>
      <h2 className={classes.h2}>
        TOTAL: <span>0</span>
      </h2>
    </section>
  );
};

export default FormConvert;
