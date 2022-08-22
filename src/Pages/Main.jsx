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
import simplifyExpense from "./SimplifyExpense";

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
          avg: [300, 320],
          logo: Logo[0],
          expenses: [
            {
              Khana: [
                { Name: "Abhishek", Amount: 900 },
                { Name: "Shubhum", Amount: 0 },
                { Name: "topesh", Amount: 0 },
              ],
            },
            {
              Rakesh: [
                { Name: "Abhishek", Amount: 0 },
                { Name: "Shubhum", Amount: 0 },
                { Name: "topesh", Amount: 960 },
              ],
            },
          ],
          members: ["Abhishek", "Shubhum", "topesh"],
          result: [
            [
              { giver: "Shubhum", amount: 300, taker: "Abhishek" },
              { giver: "topesh", amount: 300, taker: "Abhishek" },
            ],
            [
              { giver: "Abhishek", amount: 320, taker: "topesh" },
              { giver: "Shubhum", amount: 320, taker: "topesh" },
            ],
          ],
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
                  // let {}

                  let ans;
                  if (tempObject?.result) {
                    const { temp, result } = simplifyExpense(tempObject.result);
                    ans = result;
                    // console.log("temp??.>>",temp);
                  }
                  // console.log(">>?<><?<<><?> xxx",tempObject)

                  return (
                    <Card
                      key={y}
                      Name={name}
                      logo={tempObject.logo}
                      func={() => {
                        updateIndexOfObject(y);
                        updateResult(true);
                      }}
                      impData ={ans}
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
      </div>
    </div>
  );
}

export default Main;
