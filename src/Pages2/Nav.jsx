import React, { useContext } from "react";
import { Theme } from "../Context/Provider";

const Nav = ({ styles }) => {
  const { updateLogin } = useContext(Theme);
  return (
    <div style={styles}>
      Nav
      <div
        onClick={() => {
          updateLogin(false);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("phone");
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Nav;
