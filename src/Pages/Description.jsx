import React, { useEffect } from "react";
import { useState } from "react";

import { FaAngleLeft, FaPlus } from "react-icons/fa";
import CardForDescription from "../Component/CardForDescription";
import DropBox from "../Component/DropBox";
import DropBoxDescription from "../Component/DropBoxDescription";
import simplifyExpense from "./SimplifyExpense";

const Description = ({ mainObject, updateMainObj, index }) => {
  let tempObj;
  if (mainObject[index][Object.keys(mainObject[index])]) {
    tempObj = mainObject[index][Object.keys(mainObject[index])];
  }
  useEffect(() => {
    tempObj.expenses = [];
    tempObj.result = [];
    tempObj.avg = [];
  }, []);

  let [showAdd, updateShowAdd] = useState(false);

  // console.log("??>?>?>", tempObj?.result);
  let ans;
  if (tempObj?.result) {
    const { temp, result } = simplifyExpense(tempObj.result);
    ans = result;
    // console.log("temp??.>>",temp);
  }

  return (
    <div
      style={{
        height: "700px",
        // backgroundColor: primary["light"],
        overflow: "scroll",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {showAdd ? (
        <DropBoxDescription
          updateMainObj={updateMainObj}
          obj={tempObj}
          updateShowAdd={updateShowAdd}
          mainObj={mainObject}
        />
      ) : (
        void 0
      )}
      <div
        style={{
          fontSize: 30,
          textDecoration: "bold",
          display: "flex",
          alignItems: "center",
          borderBottomColor: "#c0c0c0",
          borderBottomStyle: "solid",
          borderBottomWidth: "4px",
          paddingBottom: 40,
          padding: 10,
        }}
      >
        <div style={{ marginRight: 10, fontSize: 50 }}>{tempObj.logo}</div>
        <div>{Object.keys(mainObject[index])}</div>
      </div>
      <div
        style={{
          top: -20,
          position: "relative",
          backgroundColor: "orange",
          marginLeft: 30,
          marginRight: 30,
          padding: 20,
          borderRadius: 11,
        }}
      >
        {/* {tempObj["result"]?.map((result, y) => {
          let ansInString = result.map((x) => {
            return x.taker + " own " + x.amount + " from " + x.giver;
          });
          return ansInString.map((x1, y1) => {
            return <div>{x1}</div>;
          });
        })} */}
        {ans.map((x, y) => {
          return <div key={y}>{x}</div>;
        })}
      </div>

      <div>
        {tempObj?.expenses?.map((x, y) => {
          return <CardForDescription obj={tempObj} index={y} />;
        })}
      </div>
      <div
        className="addbutton"
        onClick={() => {
          updateShowAdd(true);
        }}
      >
        <FaPlus />
      </div>
    </div>
  );
};

export default Description;
