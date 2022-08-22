import React from "react";

import "./Card.css";

import { FaTrashAlt } from "react-icons/fa";

const Card = ({ Name, func, logo, impData }) => {
  const rand = Math.floor(Math.random() * logo.length);
  // console.log("??>?>?>?>", func);
  return (
    <div className="topCard" onClick={func}>
      <div
        style={{
          fontSize: 80,
          display: "flex",
          justifyContent: "center",
          margin: 10,
        }}
      >
        {logo}
        {/* {logo[rand]} */}
      </div>
      <div style={{ marginLeft: 20 }}>
        <div className="name">{Name}</div>
        <div>
          {impData?.map((x, y) => {
            return <div key={y}>{x}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
