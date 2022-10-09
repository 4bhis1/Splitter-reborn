import React, { useContext, useEffect, useState } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";

import pic2 from "../Images/no-data-found.png";
import CashInDialog from "./CashInDialog";
import { CashOutDialog } from "./CashOutDialog";

const PersonalExpense = () => {
  const data = useContext(Theme);

  const [hideCashIn, updateHideCashIn] = useState(false);
  const [hideCashOut, updateHideCashOut] = useState(false);

  const [useExpense, updateUserExpense] = useState();

  let Gain = 0;
  let Loss = 0;

  let TotalLeft = 0;

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
        updateUserExpense(temp["data"]);
        // data = temp;
      });
  }, [hideCashIn, hideCashOut]);

  if (useExpense) {
    useExpense.map((x) => {
      Gain += x["credit"];
      Loss += x["debit"];
    });

    TotalLeft = Gain - Loss;
  }

  const RenderCard = (props) => {
    let str = "",
      amnt = "";
    if (props.Loss || props.Loss === 0) {
      str = "Loss";
      amnt = props.Loss;
    } else {
      str = "Gain";
      amnt = props.Gain;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>{str}</div>
        <div>{amnt}</div>
      </div>
    );
  };

  return (
    <div style={{ height: "100%", flexDirection: "column", display: "flex" }}>
      {useExpense && !!useExpense.length ? (
        <div style={{ flex: 1, overflow: "scroll", overflowX: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: 20,
                width: 300,
                margin: 20,
                marginTop: 40,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <RenderCard Gain={Gain} />
                <RenderCard Loss={Loss} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ cursor: "pointer" }}>Graph</div>
                <div>{TotalLeft}</div>
              </div>
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
                          marginBottom: -15,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 20 }}>{x["expensename"]}</div>
                          <div style={{ fontSize: 17 }}>{x["description"]}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: 25 }}>{x["debit"]}</div>
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "lightGreen",
                          display: "flex",
                          justifyContent: "space-between",
                          margin: 30,
                          padding: 10,
                          marginBottom: -15,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 20 }}>{x["expensename"]}</div>
                          <div style={{ fontSize: 17 }}>{x["description"]}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: 25 }}>{x["credit"]}</div>
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
            // console.log("Clicked in cash in");
            updateHideCashIn(true);
          }}
        >
          + Cash In
        </div>
        <div
          style={{ ...inlineStyles.bottomTextStyle, backgroundColor: "red" }}
          onClick={() => {
            // console.log("Clicked in cash out");
            updateHideCashOut(true);
          }}
        >
          - Cash Out
        </div>
      </div>
      <CashInDialog hideCashIn={hideCashIn} updateHideCashIn={updateHideCashIn} />
      <CashOutDialog hideCashOut={hideCashOut} updateHideCashOut={updateHideCashOut} />
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
