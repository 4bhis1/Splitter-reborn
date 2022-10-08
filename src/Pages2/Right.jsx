import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import DialogOfExpense from "../Component2/DialogsOfExpense";
import PersonalExpense from "../Component2/PersonalExpense";
import { ip } from "../config";

import pic1 from "../Images/select-a-tab.png";
import pic2 from "../Images/no-data-found.png";

const Right = ({ styles, groupToNavigate, updateExpenseHide, expenseHide }) => {
  let [showExpenseDialog, updateShowExpenseDialog] = useState({ show: false, data: "" });
  let [data, updateData] = useState();

  let [showPEDialog, updateShowPEDialog] = useState({ show: false, data: "" });

  // const [PE,upda]

  useEffect(() => {
    if (groupToNavigate && groupToNavigate["PE"]) {
    } else if (groupToNavigate) {
      const text = {
        token: window.localStorage.getItem("token"),
        groupid: groupToNavigate["id"],
      };
      fetch(`${ip}/api/v1/expenses/showexpenses`, {
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
        .then((data) => {
          // console.log("datata",data );
          updateData(data["final"]);
        });
    }
  }, [groupToNavigate, expenseHide]);

  // console.log("all ezpenses >>>>>>>>>>>>", data);

  const ShowData = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>
          {data && !!data["data"].length ? (
            data["data"].map((x, y) => {
              console.log(x);
              let date = x.createdon.substr(0, 10);
              let mainobj = "";
              if (!!x["expense"].length && x["expense"][0]["name"] !== "You")
                mainobj = "You are not involved in this budget";
              else if (!!x["expense"].length) mainobj = x["expense"][0]["name"] + " paid " + x["expense"][0]["amount"];
              return (
                <div
                  key={y}
                  style={{
                    backgroundColor: "cyan",
                    margin: 10,
                    display: "flex",
                    height: 100,
                    cursor: "pointer",
                    width: "95%",
                  }}
                  onClick={() => {
                    updateShowExpenseDialog({ show: true, data: x });
                    // console.log("clicked and the data is - >", x);
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
                    Yha pe image
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
                      {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
                      <div>{x.expensename}</div>
                      {/* <div>Edit</div> */}
                      {/* </div> */}
                      <div>{mainobj}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>{date}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No Records to Show
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ ...styles }}>
      {/* Nothing to show content  */}
      {groupToNavigate ? (
        <div style={{ height: "100%" }}>
          {groupToNavigate["PE"] ? (
            <PersonalExpense />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div
                style={{
                  height: 40,
                  backgroundColor: "Green",
                  padding: 10,
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
                  fontSize: 22,
                  fontWeight: 400,
                  paddingLeft: 20,
                }}
              >
                {groupToNavigate.groupname}
              </div>
              <div style={{ overflow: "scroll", overflowX: "hidden", flex: 1 }}>
                {data && !!data["data"].length ? (
                  <div>
                    {data && data["result"] && !!data["result"]["result"].length ? (
                      <div
                        style={{
                          width: "70%",
                          margin: "auto",
                          marginTop: 20,
                          marginBottom: 20,
                          backgroundColor: "tomato",
                          padding: 20,
                          borderRadius: 10,
                        }}
                      >
                        {data["result"]["result"].map((x, y) => {
                          return <div key={y}>{x}</div>;
                        })}
                      </div>
                    ) : (
                      void 0
                    )}
                    <ShowData />
                  </div>
                ) : (
                  <div
                    style={{
                      margin: "auto",
                      position: "relative",
                      top: "30%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img src={pic2} height="250px" />
                  </div>
                )}
              </div>
              <div
                className="addGroup"
                style={{
                  backgroundColor: "orange",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // padding : 20,
                  fontSize: 30,
                  padding: 15,
                  // margin: 20,
                  marginRight: 10,
                }}
                onClick={() => {
                  updateExpenseHide(true);
                  // updateData([]);
                }}
              >
                <FaPlus />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            margin: "auto",
            position: "relative",
            top: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={pic1} />
          Select a tab
        </div>
      )}

      <DialogOfExpense hide={showExpenseDialog.show} hideFunc={updateShowExpenseDialog} data={showExpenseDialog.data} />
    </div>
  );
};

export default Right;
