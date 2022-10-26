import { Dialog } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Theme } from "../Context/Provider";

import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { ip } from "../config";
import { addExtraZero } from "../PureFunctions";
import { StandardDate } from "../lib/PureFunctions";

let GroupByDate = (data) => {
  let obj = {};

  for (let i of data) {
    let temp = StandardDate(i.chatdate);

    console.log("@@@@@", i);

    if (!obj[temp]) {
      obj[temp] = [
        {
          name: i.name,
          phone: i.phone,
          text: i.text,
          chatdate: i.chatdate,
        },
      ];
    } else {
      obj[temp].push({
        name: i.name,
        phone: i.phone,
        text: i.text,
        chatdate: i.chatdate,
      });
    }
  }

  console.log(" >>>>>>>>>>>data", obj);
  return obj;
};

const DialogOfExpense = (props) => {
  const { hide, hideFunc, data: groupdata } = props;

  const { userPhone, firstname } = useContext(Theme);

  // console.log("???", userPhone, firstname);

  let [chat, updateChat] = useState();
  let [falseState, updateFalseState] = useState();

  // console.log("???? data", groupdata);

  const [text, updateText] = useState("");

  const handleClose = () => {
    hideFunc((data) => {
      return { ...data, show: false };
    });
  };

  // console.log("@@@ data DialogsOfExpense", groupdata["groupid"]);

  useEffect(() => {
    // console.log("chla use Effect DialogsOfExpense");

    fetch(`${ip}/api/v1/expenses/showchat`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        groupid: groupdata["_id"],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("@@@@ data from DialogsOfExpense", data["data"][0]["chat"]);
        if (data && data["data"]) {
          console.log("@@@@ Group by data", GroupByDate(data["data"][0]["chat"]));
          updateChat(GroupByDate(data["data"][0]["chat"]));
        }
        updateFalseState("");
      });
    // return console.log("DialogsOfExpense unmounted");
  }, [groupdata, falseState]);

  return (
    <Dialog onClose={handleClose} open={hide}>
      <div style={{ padding: 20 }}>
        {groupdata ? (
          <div>
            <div style={{ fonstSize: "22px", marginBottom: 10, fontWeight: "bold" }}>{groupdata.expensename}</div>

            <div style={{ marginLeft: 30, marginRight: 10 }}>
              {groupdata.expense.map((x, y) => {
                return (
                  <div key={y} style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>{x.name}</div>
                    <div>{x.amount}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: 17, marginTop: 10 }}>Chat section</div>
            <div style={{ padding: 10, width: 400, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  maxHeight: 200,
                  minHeight: 150,
                  backgroundColor: "yellowgreen",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "scroll",
                  overflowX: "hidden",
                  padding: 10,
                }}
              >
                {chat
                  ? Object.keys(chat).map((key1, index1) => {
                      return (
                        <>
                          <div style={{ display: "flex", justifyContent: "center", margin : 20 }}>
                            <div style={{ backgroundColor: "yellow" }}>{key1}</div>
                          </div>
                          {chat[key1].map((x, y) => {
                            return (
                              <div
                                key={y}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: 2,
                                  justifyContent: x.phone == userPhone ? "right" : "left",
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "cyan",
                                    minWidth: 0,
                                    maxWidth: "80%",
                                    padding: 4,
                                    borderRadius: 6,
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {x.phone != userPhone ? (
                                    <div style={{ fontSize: 15, color: "#001cff", textDecoration: "underline" }}>
                                      {x.name}
                                    </div>
                                  ) : (
                                    void 0
                                  )}

                                  <div style={{ paddingLeft: 4 }}>{x.text}</div>
                                  <div style={{ fontSize: 12, textAlign: "right" }}>
                                    {x.chatdate.hour / 12 > 0
                                      ? `${addExtraZero(x.chatdate.hour % 12)} : ${addExtraZero(x.chatdate.min)} PM`
                                      : `${addExtraZero(x.chatdate.hour)} : ${addExtraZero(x.chatdate.min)} AM`}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      );
                    })
                  : void 0}
              </div>

              <div
                style={{
                  display: "flex",
                  backgroundColor: "yellow",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flex: 1, marginRight: 10, height: 30, marginLeft: 5 }}>
                  <input
                    type="text"
                    style={{ flex: 1, paddingLeft: 10 }}
                    placeholder="Type Something ...."
                    value={text}
                    onChange={(e) => {
                      updateText(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 25,
                    padding: 5,
                    // backgroundColor: "green",
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    fetch(`${ip}/api/v1/expenses/addchat`, {
                      method: "POST",
                      headers: {
                        Accept: "application.json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        token: window.localStorage.getItem("token"),

                        groupid: groupdata["_id"],
                        name: firstname,
                        text: text,
                        phone: userPhone,
                      }),
                    }).catch((err) => {
                      console.log("fetch error" + err);
                    });

                    updateFalseState("---");
                    updateText("");
                  }}
                >
                  <AiOutlineSend />
                </div>
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

export default DialogOfExpense;
