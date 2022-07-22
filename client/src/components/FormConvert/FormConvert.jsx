import classes from "./FormConvert.module.css";
import axios from "axios";
import { useState } from "react";

const FormConvert = () => {
  const [userInfo, setUserInfo] = useState({
    amount: 0,
    original: "",
    convertTo: "",
  });
  const [result, setResult] = useState(0);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const convertHandler = async (e) => {
    e.preventDefault();
    console.log(userInfo);

    await axios
      .get(`/api/${userInfo.original}&${userInfo.convertTo}`)
      .then((serverRes) => {
        console.log(serverRes.data);
        let value = Object.values(serverRes.data);
        let mult = value[0] * Number(userInfo.amount);
        setResult(mult.toFixed(2));
      })
      .catch((err) => console.log(err.response.status));
  };

  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>CONVERT</h2>
      <form className={classes.form}>
        <input
          name="amount"
          value={userInfo.amount}
          className={classes.input}
          type="number"
          placeholder="AMOUNT"
          onChange={inputChangeHandler}
        />
        <p className={classes.secP}>FROM</p>
        <input
          name="original"
          value={userInfo.original}
          className={classes.input}
          type="text"
          placeholder="CURRENCY"
          onChange={inputChangeHandler}
        />
        <p className={classes.secP}>TO</p>
        <input
          name="convertTo"
          value={userInfo.convertTo}
          className={classes.input}
          type="text"
          placeholder="CURRENCY"
          onChange={inputChangeHandler}
        />
        <input
          onClick={convertHandler}
          className={classes.submit}
          value="Result"
          type="submit"
        />
      </form>
      <h2 className={classes.h2}>
        TOTAL: <span>{result}</span>
      </h2>
    </section>
  );
};

export default FormConvert;
