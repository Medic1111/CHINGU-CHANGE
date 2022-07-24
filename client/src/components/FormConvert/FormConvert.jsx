import classes from "./FormConvert.module.css";
import axios from "axios";
import { useState, useContext } from "react";
import { userCtx } from "../../store/user-ctx";
import { uiCtx } from "../../store/ui-ctx";
import currencyList from "../../data/currencyList";

const FormConvert = () => {
  const userCtxMgr = useContext(userCtx);
  const uiCtxMgr = useContext(uiCtx);

  const [result, setResult] = useState(0);

  const inputChangeHandler = (e) => {
    uiCtxMgr.setShowSave(false);
    const { name, value } = e.target;
    userCtxMgr.setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const convertHandler = async (e) => {
    e.preventDefault();
    uiCtxMgr.setIsLoading(true);
    await axios
      .get(
        `/api/${userCtxMgr.userInfo.original}&${userCtxMgr.userInfo.convertTo}`
      )
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        let value = Object.values(serverRes.data);
        let mult = value[0] * Number(userCtxMgr.userInfo.amount);
        setResult(mult.toFixed(2));
        uiCtxMgr.setShowSave(true);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
        uiCtxMgr.onSetError(
          "Oops, something went wrong =[ ...please try again"
        );
      });
  };

  const addToListHandler = async (e) => {
    e.preventDefault();
    uiCtxMgr.setIsLoading(true);

    const objToSend = {
      original: userCtxMgr.userInfo.original.toUpperCase(),
      convertTo: userCtxMgr.userInfo.convertTo.toUpperCase(),
      userID: userCtxMgr.user,
    };
    await axios
      .post("/api/saveCurrencies", objToSend)
      .then((serverRes) => {
        uiCtxMgr.setIsLoading(false);
        userCtxMgr.setList(serverRes.data.currencies);
      })
      .catch((err) => {
        uiCtxMgr.setIsLoading(false);
        uiCtxMgr.onSetError(
          "Oops, something went wrong =[ ...please try again"
        );
      });
  };

  const list = currencyList.map((cur) => {
    const currencyKey = Object.keys(cur)[0];
    return (
      <option key={currencyKey} value={currencyKey}>
        {currencyKey}
      </option>
    );
  });

  return (
    <section className={classes.section}>
      <h2 className={classes.h2}>CONVERT</h2>
      <form className={classes.form}>
        <input
          autoComplete="off"
          name="amount"
          value={userCtxMgr.userInfo.amount}
          className={classes.input}
          type="number"
          placeholder="AMOUNT"
          onChange={inputChangeHandler}
        />
        <label htmlFor="original" className={classes.secP}>
          From:
        </label>
        <select
          id="original"
          className={classes.input}
          name="original"
          value={userCtxMgr.userInfo.original}
          onChange={inputChangeHandler}
        >
          {list}
        </select>
        <label htmlFor="convertTo" className={classes.secP}>
          To:
        </label>
        <select
          id="convertTo"
          className={classes.input}
          name="convertTo"
          value={userCtxMgr.userInfo.convertTo}
          onChange={inputChangeHandler}
        >
          {list}
        </select>
        <div className={classes.btnBox}>
          <input
            onClick={convertHandler}
            className={classes.submit}
            value="Result"
            type="submit"
          />

          <button
            onClick={addToListHandler}
            className={uiCtxMgr.showSave ? classes.submit : classes.disabled}
            disabled={!uiCtxMgr.showSave && true}
            type="submit"
          >
            Add Fav
          </button>
        </div>
      </form>
      <h2 className={classes.h2}>
        TOTAL: <span>{result}</span>
      </h2>
    </section>
  );
};

export default FormConvert;
