import React from "react";
import Calculate from "../Pages/Calculation";

const CardForDescription = ({ obj, index }) => {
  const data = obj.expenses[index];
  const name = Object.keys(data);
  const result = obj.result[index];
  const tempData = data[name];

  const avg = obj.avg[index]


  let ansInString = result.map((x) => {
    return x.taker + " own " + x.amount + " from " + x.giver;
  });

  return (
    <div className="topCard" style={{ display: "block" }}>
      <div>{name}</div>
      <div style={{ marginLeft: 20, marginTop: 10 }}>
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
