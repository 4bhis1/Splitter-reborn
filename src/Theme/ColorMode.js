import React from "react";
import { Color } from "./Colors";

const ColorMode = (mode, name) => {
  let bool = mode;
  // console.log("ColorMode", "-->", bool);

  // if (mode !== "light") {
  //   // for dark mode
  //   return {
  //     darker: Color[`${color}`][900],
  //     dark: Color[`${color}`][800],
  //     light: Color[`${color}`][700],
  //     lighter: Color[`${color}`][600],
  //     font: "rgb(255,255,255)",
  //   };
  // } else {
  //   // for light mode
  //   return {
  //     darker: Color[`${color}`][400],
  //     dark: Color[`${color}`][300],
  //     light: Color[`${color}`][300],
  //     lighter: Color[`${color}`][100],
  //     font: "rgb(20,20,20)",
  //   };
  // }

  if (mode) {
    return Color[`${name}`]["light"];
  } else {
    return Color[`${name}`]["dark"];
  }
};

export default ColorMode;
