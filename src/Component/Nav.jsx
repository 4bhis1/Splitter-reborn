import React, { useContext } from "react";

import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { Theme } from "../Context/Provider";
import Swipe from "./Swipe";

const Nav = ({ result, updateResult, primary, changeTheme, themeMode }) => {
  const { updateLogin } = useContext(Theme);
  return (
    <nav
      style={{
        display: "flex",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {result ? (
          <div
            onClick={() => {
              updateResult(false);
            }}
            style={{
              fontSize: 30,
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaAngleLeft />
          </div>
        ) : (
          void 0
        )}
        {/* back button */}
        <div />
        <div
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            fontFamily: "cursive",
          }}
        >
          Swiper
        </div>
      </div>
      <div
        onClick={() => {
          console.log("Clicked logout.. will logout");
          localStorage.removeItem("token");
          updateLogin(false);
        }}
      >
        Logout
      </div>
      <Swipe
        toggle={themeMode}
        backgroundColor={primary["main"]}
        onClick={() => {
          changeTheme(!themeMode);
        }}
      />
    </nav>
  );
};

export default Nav;
