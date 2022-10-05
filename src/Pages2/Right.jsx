import { ConstructionOutlined, ContactPageSharp, ResetTvOutlined } from "@mui/icons-material";
import { autocompleteClasses, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { ip } from "../config";

const DialogOfExpense = (props) => {
  const { hide, hideFunc, data } = props;

  const handleClose = () => {
    hideFunc((data) => {
      return { ...data, show: false };
    });
  };

  console.log("data here", data);

  return (
    <Dialog onClose={handleClose} open={hide}>
      <div style={{ padding: 10 }}>
        {data ? (
          <div>
            <div>{data.expensename}</div>

            <div style={{ marginLeft: 30, marginRight: 10 }}>
              {data.expense.map((x, y) => {
                return (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>{x.name}</div>
                    <div>{x.amount}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: 17, marginTop: 10 }}>Chat section</div>
            <div style={{ padding: 10, width: 400 }}>
              <div style={{ maxHeight: 200, minHeight: 60, backgroundColor: "yellowgreen" }}>
                yha apna chat section rahega
              </div>

              <div style={{ display: "flex" }}>
                <div>
                  <input type="text" />
                </div>
                <div>Submit</div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Dialog>
  );
};

const Right = ({ styles, groupToNavigate, updateExpenseHide }) => {
  // console.log("???.../../ group to navigate", groupToNavigate);

  let [showExpenseDialog, updateShowExpenseDialog] = useState({ show: false, data: "" });

  let [data, updateData] = useState();

  // const [PE,upda]

  useEffect(() => {
    if (groupToNavigate && groupToNavigate["PE"]) {
      console.log("PE portal me aa gya");
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
  }, [groupToNavigate]);

  // console.log("all ezpenses >>>>>>>>>>>>", data);

  const ShowData = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", overflow: "scroll", overflowX: "hidden" }}>
        <div style={{ backgroundColor: "greenYellow", height: 510, width: "80%" }}>
          {data && !!data["data"].length ? (
            data["data"].map((x, y) => {
              // console.log(x);
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
                    height: 100,
                    cursor: "pointer",
                    width: "95%",
                  }}
                  onClick={() => {
                    updateShowExpenseDialog({ show: true, data: x });
                    console.log("clicked and the data is - >", x);
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
    <div style={styles}>
      {/* Nothing to show content  */}
      {groupToNavigate ? (
        <div>
          {groupToNavigate["PE"] ? (
            <div>Perosnal Expense aa jayega yha pe kya load h</div>
          ) : (
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
                {data && data["result"] && !!data["result"]["result"].length ? (
                  data["result"]["result"].map((x, y) => {
                    return <div>{x}</div>;
                  })
                ) : (
                  <div>No Records yet</div>
                )}
              </div>
              <ShowData />
            </div>
          )}
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
              margin: 20,
            }}
            onClick={() => {
              groupToNavigate["PE"] ? console.log("Haa pE ka data load kr k bhejenge") : updateExpenseHide(true);
              // updateData([]);
            }}
          >
            <FaPlus />
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
      <DialogOfExpense hide={showExpenseDialog.show} hideFunc={updateShowExpenseDialog} data={showExpenseDialog.data} />
    </div>
  );
};

export default Right;
