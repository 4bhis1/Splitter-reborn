import React, { useContext, useEffect, useState } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";

import pic2 from "../Images/no-data-found.png";
import CashInDialog from "./CashInDialog";
import { CashOutDialog } from "./CashOutDialog";

const PersonalExpense = () => {
  const data = useContext(Theme);

  const [useExpense, updateUserEpense] = useState();

  useEffect(() => {
    fetch(`${ip}/api/v1/PE/showexpenses`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        userid: data["objectId"],
      }),
    })
      .then((temp) => temp.json())
      .then((temp) => {
        updateUserEpense(temp["data"]);
        // data = temp;
      });
  }, []);

  // console.log("??? useexpense", useExpense);

  return (
    <div style={{ height: "100%", flexDirection: "column", display: "flex" }}>
      {useExpense && !!useExpense.length ? (
        <div style={{ flex: 1, overflow: "scroll", overflowX: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ backgroundColor: "white", padding: 20, width: 300, margin: 20, marginTop: 40 }}>
              No data yer
            </div>
          </div>
          {useExpense
            ? useExpense.map((x, y) => {
                return (
                  <div key={y}>
                    {x["debit"] > 0 ? (
                      <div
                        style={{
                          backgroundColor: "tomato",
                          display: "flex",
                          justifyContent: "space-between",
                          margin: 30,
                          padding: 10,
                        }}
                      >
                        <div>{x["debitType"]}</div>
                        <div>{x["debit"]}</div>
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "lightGreen",
                          display: "flex",
                          justifyContent: "space-between",
                          margin: 30,
                          padding: 10,
                        }}
                      >
                        <div>{x["debitType"]}</div>
                        <div>{x["debit"]}</div>
                      </div>
                    )}
                  </div>
                );
              })
            : void 0}
        </div>
      ) : (
        <div
          style={{
            margin: "auto",
            position: "relative",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={pic2} height="250px" />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",

          marginBottom: 10,
          height: "7%",
        }}
      >
        <div
          style={{ ...inlineStyles.bottomTextStyle, backgroundColor: "green" }}
          onClick={() => {
            console.log("Clicked in cash in");
          }}
        >
          + Cash In
        </div>
        <div
          style={{ ...inlineStyles.bottomTextStyle, backgroundColor: "red" }}
          onClick={() => {
            console.log("Clicked in cash out");
          }}
        >
          - Cash Out
        </div>
      </div>
      <CashInDialog />
      <CashOutDialog />
    </div>
  );
};

export default PersonalExpense;

const inlineStyles = {
  bottomTextStyle: {
    padding: 10,

    width: "40%",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    alignItems: "center",
    fontSize: 22,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
};
