import { createContext, useState } from "react";

export const userCtx = createContext({
  user: "",
  setUser: () => {},
  list: [],
  setList: [],
  userInfo: {
    amount: 1,
    original: "USD",
    convertTo: "CAD",
  },
  setUserInfo: () => {},
});

const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const [list, setList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    amount: 1,
    original: "USD",
    convertTo: "CAD",
  });
  return (
    <userCtx.Provider
      value={{
        user,
        setUser,
        list,
        setList,
        userInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </userCtx.Provider>
  );
};

export default UserProvider;
