import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import Auth from "./components/Auth/Auth";

function App() {
  // let original = "USD";
  // let convertTo = "PHP";

  // const fetchApi = () => {
  //   axios
  //     .get(`/api/${original}&${convertTo}`)
  //     .then((serverRes) => console.log(serverRes.data))
  //     .catch((err) => console.log(err.response.status));
  // };

  // useEffect(fetchApi, []);

  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;
