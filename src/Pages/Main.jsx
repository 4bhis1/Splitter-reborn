import React, { useContext, useState } from "react";
import Card from "../Component/CardForGroups";
import ResultToCard from "../Component/ResultToCard";
import Swipe from "../Component/Swipe";
import { Theme } from "../Context/Provider";
import Calculate from "./Calculation";

import "./Main.css";

import { AiOutlineClose } from "react-icons/ai";
import { FaAngleLeft, FaPlus } from "react-icons/fa";

import DropBox from "../Component/DropBox";
import Nav from "../Component/Nav";
import Description from "./Description";
import Logo from "../Theme/Logo";
import { useEffect } from "react";

let all = [];

function Main() {
  let { themeMode, changeTheme, colorFunction } = useContext(Theme);
  let primary = colorFunction(themeMode, "primary");
  let secondary = colorFunction(themeMode, "secondary");

  let [result, updateResult] = useState(false);
  let [showAdd, updateShowAdd] = useState(false);
  let [indexOfObject, updateIndexOfObject] = useState(0);

  let [mainObject, updateMainObject] = useState([]);

  useEffect(() => {
    updateMainObject([
      {
        Dehradoon: {
          logo: Logo[0],
          // date
          members: ["Abhishek", "Shubhum", "topesh"],
        },
      },
    ]);
  }, []);

  console.log("main Object -->", mainObject);

  return (
    <div
      style={{
        backgroundColor: primary["backgroundColor"],
        height: window.innerHeight,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: secondary["light"],
          width: 500,
          height: window.innerHeight,
        }}
      >
        <Nav
          result={result}
          updateResult={updateResult}
          primary={primary}
          changeTheme={changeTheme}
          themeMode={themeMode}
        />
        {/* {!result ? (
          <> */}
        <div
          style={{
            marginLeft: 10,
            marginRight: 10,
            height: "700px",
            backgroundColor: primary["light"],
            position: "relative",
          }}
        >
          {!result ? (
            <>
              {showAdd ? (
                <DropBox
                  updateMainObj={updateMainObject}
                  obj={mainObject}
                  updateShowAdd={updateShowAdd}
                />
              ) : (
                void 0
              )}

              <div
                style={{
                  height: "700px",
                  backgroundColor: primary["light"],
                  overflow: "scroll",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                {mainObject.map((x, y) => {
                  // let tempObject = Object.keys(x);
                  let name = Object.keys(x)[0];
                  let tempObject = mainObject[y][Object.keys(x)];
                  // console.log("---> tempObject", tempObject);
                  return (
                    <Card
                      key={y}
                      Name={name}
                      logo={tempObject.logo}
                      func={() => {
                        console.log("Clicked here");
                        updateIndexOfObject(y);
                        updateResult(true);
                        // console.log(y);
                      }}
                    />
                  );
                })}
              </div>

              <div
                className="addbutton"
                onClick={() => {
                  updateShowAdd(true);
                }}
              >
                <FaPlus /> <span style={{ marginLeft: 10 }} />
                Group
              </div>
            </>
          ) : (
            <div>
              <Description
                mainObject={mainObject}
                updateMainObj={updateMainObject}
                index={indexOfObject}
              />
            </div>
          )}
        </div>
        {/* <div
              className="ResultButton"
              style={{ backgroundColor: primary["main"] }}
              onClick={() => {
                let k = Calculate(all);
                // console.log("answer from function",Calculate(all))
                // console.log("answer in a variable",k)
                updateAns(k);
                updateResult(true);
              }}
            > */}
        {/* Results */}
        {/* </div> */}
        {/* </> */}
        {/* ) : (
          <div
            style={{
              marginLeft: 10,
              marginRight: 10,
              height: "610px",
              padding: 1,
              backgroundColor: primary["light"],
            }}
          >
            <div>
              {console.log(ans)}
              {ans.map((x, y) => {
                return (
                  <ResultToCard
                    giver={x.giver}
                    amount={x.amount}
                    taker={x.taker}
                  />
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Main;
