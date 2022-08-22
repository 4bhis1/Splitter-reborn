import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Calculate from "../Pages/Calculation";

import "./Dropbox.css";

const DropBoxDescription = ({ updateShowAdd, updateMainObj, obj, mainObj }) => {
  const [text, updateText] = useState({
    expense: "",
  });
  let members = obj.members;

  const [check, updateCheck] = useState({
    selectAll: false,
  });

  for (let i in check) {
    if (check[i] === false) check.selectAll = false;
  }

  if (check.selectAll === true) {
    for (let i in check) {
      check[i] = true;
    }
  }

  return (
    <div className="dialog">
      <div className="inputShow">
        <div className="containerOfCloseButton">
          <div
            className="closeButton"
            onClick={() => {
              updateShowAdd(false);
            }}
          >
            <AiOutlineClose />
          </div>
        </div>
        <div
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            paddingTop: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Expense Name"
            style={{ marginBottom: 10 }}
            value={text.expense}
            onChange={(e) => {
              updateText({ ...text, expense: e.target.value });
            }}
          />
          <input
            type="checkbox"
            checked={check.selectAll}
            onChange={() => {
              updateCheck({ ...check, selectAll: !check.selectAll });
            }}
          />
          Select all
          <div style={{ paddingLeft: 15, paddingTop: 5, paddingBottom: 5 }}>
            {members.map((x, y) => {
              if (!text[x]) text[x] = 0;

              if (check.selectAll)
                if (!check[x]) check[x] = true;
                else if (!check[x]) check[x] = false;

              return (
                <div style={{ display: "flex" }} key={y}>
                  <input
                    type="checkbox"
                    checked={check[x]}
                    onChange={(e) => {
                      updateCheck({ ...check, [x]: !check[x] });
                    }}
                  />
                  {x}
                  <input
                    type="number"
                    style={{ width: 50 }}
                    value={text.x}
                    onChange={(e) => {
                      updateText({ ...text, [x]: e.target.value });
                      if (e.target.value > 0) {
                        check[x] = true;
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              let arr = [];

              for (let i in check) {
                if (check[i] === true && i !== "selectAll") {
                  const temp = { Name: i, Amount: parseInt(text[i]) };
                  arr = [...arr, temp];
                }
              }

              obj.expenses = [...obj.expenses, { [text.expense]: arr }];

              const { result, avg } = Calculate(arr);

              obj.result = [...obj.result, result];
              obj.avg = [...obj.avg,avg];

              updateMainObj([...mainObj]);
              updateShowAdd(false);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropBoxDescription;
