import { createContext, useState } from "react";

export const userCtx = createContext({
  user: "",
  setUser: "",
  list: [],
  setList: [],
});

const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const [list, setList] = useState([]);

  return (
    <userCtx.Provider
      value={{
        user,
        setUser,
        list,
        setList,
      }}
    >
      {props.children}
    </userCtx.Provider>
  );
};

export default UserProvider;
