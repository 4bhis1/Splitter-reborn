import "./App.css";
import Main from "./Pages2/Main";
// import Main from "./Pages/Main"

import { Theme } from "./Context/Provider";
import { useEffect, useState } from "react";
import ColorMode from "./Theme/ColorMode";
import LoginSignup from "./Pages2/LoginSignup";
import { border } from "@mui/system";
import { ip } from "./config";

function App() {
  let [themeMode, changeTheme] = useState(!window.matchMedia("(prefers-color-scheme: dark)").matches);
  let [login, updateLogin] = useState(false);
  let phone = window.localStorage.getItem("phone");

  let [userData, updateUserData] = useState({});
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      fetch(`${ip}/api/v1/users/getdata`, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          phone: phone,
        }),
      })
        .then((temp) => temp.json())
        .then((temp) => {
          updateUserData(temp);
          // data = temp;
        });

      updateLogin(true);
    }
  }, []);

  return (
    <Theme.Provider
      value={{
        themeMode,
        changeTheme: changeTheme,
        colorFunction: ColorMode,
        updateLogin: updateLogin,
        userPhone: phone,
        objectId: userData["data"] ? userData["data"]["id"] : "",
        firstname: userData["data"] ? userData["data"]["firstname"] : "",
      }}
    >
      {login ? <Main /> : <LoginSignup updateLogin={updateLogin} />}
    </Theme.Provider>
  );
}

export default App;
