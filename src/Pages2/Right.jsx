import { ConstructionOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa";

const fetchData = async (group) => {
  const text = {
    token: window.localStorage.getItem("token"),
    groupid: group,
  };
  const data = await fetch("http://localhost:4444/api/v1/expenses/getexpenses", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("fetch error" + err);
    });

  return data;
};

const Right = ({ styles, groupToNavigate, updateExpenseHide }) => {
  // console.log("group", group);
  console.log("???.../../ group to navigate", groupToNavigate);
  let [data, updateData] = useState();


  useEffect(() => {
    if (groupToNavigate) fetchData(groupToNavigate).then((data) => updateData(data["data"]));
  }, []);

  // console.log("all ezpenses", data);

  return (
    <div style={styles}>
      {/* Nothing to show content  */}
      {groupToNavigate ? (
        <div>
          <div>{groupToNavigate.groupname}</div>
          <div style={{ backgroundColor: "greenYellow" }}>
            {data
              ? data.map((x) => {
                  return <div style={{ backgroundColor: "cyan", margin: 10, padding: 10 }}>{x.expensename}</div>;
                })
              : void 0}
          </div>

          <div
            className="addGroup"
            style={{ backgroundColor: "blue" }}
            onClick={() => {
              // console.log("CLicked gere on righ");
              updateExpenseHide(true);
            }}
          >
            {/* Add Expense */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 3,
              }}
            >
              <FaPlus />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "rgb(230,230,230)",
            height: 300,
            width: 300,
            margin: "auto",
            position: "relative",
            top: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No group Selected, select a group
        </div>
      )}
    </div>
  );
};

export default Right;
