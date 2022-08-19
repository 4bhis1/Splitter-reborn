import React, { useEffect } from "react";
import { useState } from "react";

import { FaAngleLeft, FaPlus } from "react-icons/fa";
import CardForDescription from "../Component/CardForDescription";
import DropBox from "../Component/DropBox";
import DropBoxDescription from "../Component/DropBoxDescription";

const Description = ({ mainObject, updateMainObj, index }) => {
  // console.log(">>>>>>>>>>>>>>>>><<<<<EEEe", mainObject);
  let tempObj;
  if (mainObject[index][Object.keys(mainObject[index])]) {
    tempObj = mainObject[index][Object.keys(mainObject[index])];
  }
  useEffect(() => {
    tempObj.expenses = [];
  }, []);

  let [showAdd, updateShowAdd] = useState(false);

  // console.log("???? --=-=-- mainObjectt", mainObject);

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
        Hellodea
      </div>

      <div>
        {tempObj?.expenses?.map((x, y) => {
          // console.log("Description ", x);
          return <CardForDescription data={x} key={y} />;
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
