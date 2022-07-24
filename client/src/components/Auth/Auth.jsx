import classes from "./Auth.module.css";
import { useContext, useState } from "react";
import { authCtx } from "../../store/auth-ctx";
import { userCtx } from "../../store/user-ctx";

import axios from "axios";

const Auth = () => {
  const authCtxMgr = useContext(authCtx);
  const userCtxMgr = useContext(userCtx);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    setError(false);

    const { name, value } = e.target;

    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const objToSend = {
      username: userInfo.username,
      password: userInfo.password,
    };

    if (userInfo.username.length > 0 && userInfo.password.length > 0) {
      await axios
        .post("api/login", objToSend)
        .then((serverRes) => {
          setError(false);
          authCtxMgr.setIsLoggedIn(true);
          userCtxMgr.setUser(serverRes.data.id);
          userCtxMgr.setList(serverRes.data.currencies);
        })
        .catch((err) => {
          setError(true);
          err.response.status === 500 && setErrorMsg("Server error");
          err.response.status === 401 && setErrorMsg("Wrong Credentials");
          err.response.status === 404 && setErrorMsg("Not Registered");
        });
    } else {
      setError(true);
      setErrorMsg("All fields are required");
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (
      userInfo.email.includes("@") &&
      userInfo.username.length >= 2 &&
      userInfo.password.length >= 6
    ) {
      await axios
        .post("api/register", userInfo)
        .then((serverRes) => {
          setError(false);
          authCtxMgr.setIsLoggedIn(true);
          userCtxMgr.setUser(serverRes.data.id);
          userCtxMgr.setList(serverRes.data.currencies);
        })
        .catch((err) => {
          setError(true);
          err.response.status === 500 && setErrorMsg("Server error");
          err.response.status === 409 && setErrorMsg("Already Registered");
          err.response.status === 400 && setErrorMsg("All fields required");
        });
    } else {
      setError(true);
      userInfo.email.includes("@") || setErrorMsg("Invalid Email");
      userInfo.username.length >= 2 || setErrorMsg("Username is required");
      userInfo.password.length >= 6 ||
        setErrorMsg("Password must be at least 6 characters long");
    }
  };

  const changeToLoginHandler = () => {
    authCtxMgr.setShowLogin(true);
    setError(false);
  };

  const changeToRegisterHandler = () => {
    setError(false);
    authCtxMgr.setShowLogin(false);
  };

  return (
    <article className={classes.article}>
      <h2 className={classes.h2}>
        {authCtxMgr.showLogin ? "LOGIN" : "REGISTER"}
      </h2>
      {error && <p className={classes.p}>{errorMsg}</p>}
      <form className={classes.form}>
        <input
          onChange={inputChangeHandler}
          name="username"
          value={userInfo.username}
          className={classes.input}
          type="text"
          placeholder="Username"
        />
        {!authCtxMgr.showLogin && (
          <input
            onChange={inputChangeHandler}
            name="email"
            value={userInfo.email}
            className={classes.input}
            type="email"
            placeholder="Email"
          />
        )}
        <input
          onChange={inputChangeHandler}
          name="password"
          value={userInfo.password}
          className={classes.input}
          type="password"
          placeholder="Password"
        />
        <input
          onClick={authCtxMgr.showLogin ? loginHandler : registerHandler}
          className={classes.submit}
          type="submit"
        />
      </form>
      {!authCtxMgr.showLogin ? (
        <p className={classes.p} onClick={changeToLoginHandler}>
          Already Registered? Login
        </p>
      ) : (
        <p className={classes.p} onClick={changeToRegisterHandler}>
          Not Registered? Register
        </p>
      )}
    </article>
  );
};

export default Auth;
