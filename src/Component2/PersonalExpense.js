import React, { useContext, useEffect, useState } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";

import pic2 from "../Images/no-data-found.png";
import { StandardDate } from "../lib/PureFunctions";
import CashInDialog from "./CashInDialog";
import { CashOutDialog } from "./CashOutDialog";

let GroupByDate = (data) => {
  let obj = {};

  for (let i of data) {
    let temp = StandardDate(i.createdon);

    console.log("@@@@@", i);

    if (!obj[temp]) {
      obj[temp] = [{ expense: i.expensename, debit: i.debit, credit: i.credit, desc: i.description }];
    } else {
      obj[temp].push({ expense: i.expensename, debit: i.debit, credit: i.credit, desc: i.description });
    }
  }

  return obj;
};

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
        // console.log(temp);
        updateUserExpense(GroupByDate(temp["data"]));
        // data = temp;
      });
  }, [hideCashIn, hideCashOut]);

  if (useExpense) {
    Object.keys(useExpense).map((x) => {
      useExpense[x].map((y) => {
        Gain += y["credit"];
        Loss += y["debit"];
      });
    });
    // useExpense.map((x) => {

    //   // Gain += x["credit"];
    //   // Loss += x["debit"];
    // });

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

  // console.log("@@@ useExpense", useExpense);

  return (
    <div style={{ height: "100%", flexDirection: "column", display: "flex" }}>
      {useExpense && !!Object.keys(useExpense).length ? (
        <div style={{ flex: 1, overflow: "scroll", overflowX: "hidden" }}>
          <div style={{ position: "relative", width: "100%", position: "relative" }}>
            <div
              style={{
                backgroundColor: "aquamarine",
                padding: 10,
                paddingBottom: 30,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div style={{ ...inlineStyles.chips }}>Month</div>
              <div style={{ ...inlineStyles.chips }}>Money</div>
              <div style={{ ...inlineStyles.chips }}>Debit / Credit </div>
              <div style={{ ...inlineStyles.chips }}>GroupBy</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  width: 300,
                  margin: 20,
                  marginTop: -20,
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
          </div>
          {useExpense
            ? Object.keys(useExpense).map((val1, index1) => {
                // console.log("@@@@@@@@@@", useExpense[x]);
                return (
                  <>
                    <div style={{ justifyContent: "center", display: "flex  ", margin: 30 }}>
                      <div style={{ backgroundColor: "yellow" }}>{val1}</div>
                    </div>

                    {useExpense[val1].map((x, y) => {
                      return (
                        <div key={y}>
                          {x["debit"] > 0 ? (
                            <div
                              style={{
                                backgroundColor: "tomato",
                                display: "flex",
                                justifyContent: "space-between",
                                margin: 10,
                                marginLeft: 30,
                                marginRight: 30,
                                padding: 10,
                                // marginBottom: -15,
                              }}
                            >
                              <div>
                                <div style={{ fontSize: 20 }}>{x["expense"]}</div>
                                <div style={{ fontSize: 17 }}>{x["desc"]}</div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", fontSize: 25 }}>{x["debit"]}</div>
                            </div>
                          ) : (
                            <div
                              style={{
                                backgroundColor: "lightGreen",
                                display: "flex",
                                justifyContent: "space-between",
                                margin: 10,
                                marginLeft: 30,
                                marginRight: 30,
                                padding: 10,
                                // marginBottom: -15,
                              }}
                            >
                              <div>
                                <div style={{ fontSize: 20 }}>{x["expense"]}</div>
                                <div style={{ fontSize: 17 }}>{x["desc"]}</div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", fontSize: 25 }}>{x["credit"]}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
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

  chips: {
    backgroundColor: "grey",
    padding: 5,
    borderRadius: 50,
    paddingRight: 30,
    cursor: "pointer",
  },
};
