import { Dialog } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Theme } from "../Context/Provider";

import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { ip } from "../config";

const DialogOfExpense = (props) => {
  const { hide, hideFunc, data } = props;

  const { userPhone, firstname } = useContext(Theme);

  // console.log("???", userPhone, firstname);

  console.log("???? data", data);

  const [text, updateText] = useState("");

  const handleClose = () => {
    hideFunc((data) => {
      return { ...data, show: false };
    });
  };

  const [chat, updateChat] = useState("");

  console.log("@@@ data", data["_id"]);

  useEffect(() => {
    fetch(`${ip}/api/v1/expenses/showexpenses`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        groupid: data["_id"],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("@@@@ data from DialogsOfExpense", data);
        // updateChat(data["final"]);
      });
  }, []);

  return (
    <Dialog onClose={handleClose} open={hide}>
      <div style={{ padding: 20 }}>
        {data ? (
          <div>
            <div style={{ fonstSize: "22px", marginBottom: 10, fontWeight: "bold" }}>{data.expensename}</div>

            <div style={{ marginLeft: 30, marginRight: 10 }}>
              {data.expense.map((x, y) => {
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
                {data && data["chat"]
                  ? data["chat"].map((x, y) => {
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
                            }}
                          >
                            {x.name}

                            {x.text}

                            {x.chatdate}
                          </div>
                        </div>
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
                    console.log("send");
                    fetch(`${ip}/api/v1/expenses/addchat`, {
                      method: "POST",
                      headers: {
                        Accept: "application.json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        token: window.localStorage.getItem("token"),

                        groupid: data["_id"],
                        name: firstname,
                        text: text,
                        phone: userPhone,
                      }),
                    }).catch((err) => {
                      console.log("fetch error" + err);
                    });

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
