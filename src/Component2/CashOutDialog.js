import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";

export const CashOutDialog = (props) => {
  const { hideCashOut, updateHideCashOut } = props;

  const handleClose = () => {
    updateHideCashOut(false);
  };

  const { objectId } = useContext(Theme);

  const [text, updateText] = useState({
    expensename: "",
    amount: "",
    description: "",
  });

  return (
    <Dialog onClose={handleClose} open={hideCashOut}>
      <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>
        <div style={{marginBottom :20}}>Cash Out</div>

        <input
          type="text"
          placeholder="Expense Name"
          style={{ marginBottom: 10 }}
          value={text.expensename}
          onChange={(e) => {
            updateText({ ...text, expensename: e.target.value });
          }}
        />

        <input
          type="Number"
          placeholder="Amount"
          style={{ marginBottom: 10 }}
          value={text.amount}
          onChange={(e) => {
            updateText({ ...text, amount: e.target.value });
          }}
        />

        <input
          type="text"
          placeholder="Desciptioon"
          style={{ marginBottom: 10 }}
          value={text.description}
          onChange={(e) => {
            updateText({ ...text, description: e.target.value });
          }}
        />

        <button
          type="text"
          onClick={() => {
            fetch(`${ip}/api/v1/PE/createexpense`, {
              method: "POST",
              headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                expensename: text["expensename"],
                userid: objectId,
                debit: text["amount"],
                credit: 0,

                description: text["description"],
              }),
            }).catch((err) => {
              console.log("fetch error" + err);
            });

            handleClose();
          }}
        >
          submit
        </button>
      </div>
    </Dialog>
  );
};
