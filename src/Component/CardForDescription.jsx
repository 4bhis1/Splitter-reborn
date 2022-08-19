import React from "react";
import Calculate from "../Pages/Calculation";

const CardForDescription = ({ data }) => {
  //   console.log("datat is hete", data[Object.keys(data)[0]]);
  const name = Object.keys(data)[0];

  let expensesOfMember = data[Object.keys(data)[0]];

  let tempData = [];

  for (let i in expensesOfMember) {
    tempData.push({ Name: i, Amount: parseInt(expensesOfMember[i]) });
  }

  const { result, avg } = Calculate(tempData);

  let ansInString = result.map((x) => {
    return x.taker + " own " + x.amount + " from " + x.giver;
  });

  return (
    <div className="topCard" style={{ display: "block" }}>
      <div>{name}</div>
      <div style={{ marginLeft: 20,marginTop : 10 }}>
        <div style={{ marginLeft: 20 }}>
          {tempData.map((x, y) => {
            return (
              <div style={{ display: "flex" }} key={y}>
                {x.Name}
                {x.Amount}
              </div>
            );
          })}
        </div>
        <div>
          {ansInString.map((x, y) => {
            return <div>{x}</div>;
          })}
          <div>{avg}</div>
        </div>
      </div>
    </div>
  );
};

export default CardForDescription;
