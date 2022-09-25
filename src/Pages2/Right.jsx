import { ConstructionOutlined, ContactPageSharp } from "@mui/icons-material";
import { autocompleteClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa";

const Right = ({ styles, groupToNavigate, updateExpenseHide }) => {
  console.log("???.../../ group to navigate", groupToNavigate);
  let [data, updateData] = useState();

  useEffect(() => {
    if (groupToNavigate) {
      const text = {
        token: window.localStorage.getItem("token"),
        groupid: groupToNavigate["id"],
      };
      fetch("http://localhost:4444/api/v1/expenses/showexpenses", {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      }).then((response) => {
        return response.json()
      }).then(data => {
        // console.log("datata",data );
        updateData(data["final"]);
      })
    }
  }, [groupToNavigate]);

  console.log("all ezpenses >>>>>>>>>>>>", data);

  return (
    <div style={styles}>
      {/* Nothing to show content  */}
      {groupToNavigate ? (
        <div>
          <div style={{ backgroundColor: "rgb(255,255,255)", padding: 10, height: 50 }}>
            {groupToNavigate.groupname}
          </div>

          <div
            style={{
              width: "70%",
              margin: "auto",
              marginTop: -20,
              marginBottom: 20,
              backgroundColor: "tomato",
              padding: 20,
              borderRadius: 10,
            }}
          >
            {/* {data["result"]} */}
            {data ? (
              data["result"]["result"].map((x, y) => {
                return <div>{x}</div>;
              })
            ) : (
              <div>No Record yet</div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", overflow: "scroll", overflowX: "hidden" }}>
            <div style={{ backgroundColor: "greenYellow", height: 510 }}>
              {data
                ? data["data"].map((x) => {
                    console.log(x);
                    let date = x.createdon.substr(0, 10);
                    let mainobj = "";
                    if (x["expense"][0]["name"] !== "You") mainobj = "You are not involved in this budget";
                    else mainobj = x["expense"][0]["name"] + " paid " + x["expense"][0]["amount"];
                    return (
                      <div
                        style={{
                          backgroundColor: "cyan",
                          margin: 10,
                          display: "flex",
                          height: 70,
                          cursor: "pointer",
                          width: 400,
                        }}
                      >
                        <div
                          style={{
                            padding: 2,
                            width: "15%",
                            backgroundColor: "rgb(132,190,90",
                            wordBreak: "break-word",
                          }}
                        >
                          Yha pe image{" "}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: 2,
                            width: "85%",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ marginTop: 2, marginLeft: 8 }}>
                            <div>{x.expensename}</div>
                            <div>{mainobj}</div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "flex-end" }}>{date}</div>
                        </div>
                      </div>
                    );
                  })
                : void 0}
            </div>
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
