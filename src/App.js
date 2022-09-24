import "./App.css";
import Main from "./Pages2/Main";
// import Main from "./Pages/Main" 

import { Theme } from "./Context/Provider";
import { useEffect, useState } from "react";
import ColorMode from "./Theme/ColorMode";
import LoginSignup from "./Pages/LoginSignup";

function App() {

  let [themeMode, changeTheme] = useState(!window.matchMedia("(prefers-color-scheme: dark)").matches);
  let [login, updateLogin] = useState(false);

  // console.log(">>>>>", window.localStorage.getItem("user"));
  let phone = "";
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      // console.log("true h bhia h tur");
      updateLogin(true);
      phone = window.localStorage.getItem("phone");
    }
  }, []);

  // console.log("phone", phone);
  // console.log("Login >>>", login);
  return (
    <Theme.Provider
      value={{
        themeMode: themeMode,
        changeTheme: changeTheme,
        colorFunction: ColorMode,
        updateLogin: updateLogin,
        userPhone: phone,
      }}
    >
      {login ? <Main /> : <LoginSignup updateLogin={updateLogin} />}
    </Theme.Provider>
  );
}

export default App;
