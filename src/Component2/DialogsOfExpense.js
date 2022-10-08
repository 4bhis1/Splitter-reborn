import { Dialog } from "@mui/material";
import React from "react";

const DialogOfExpense = (props) => {
  const { hide, hideFunc, data } = props;

  const handleClose = () => {
    hideFunc((data) => {
      return { ...data, show: false };
    });
  };

  return (
    <Dialog onClose={handleClose} open={hide}>
      <div style={{ padding: 10 }}>
        {data ? (
          <div>
            <div>{data.expensename}</div>

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

export default DialogOfExpense;
