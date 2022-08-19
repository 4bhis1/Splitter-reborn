import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

import "./Dropbox.css";

const DropBoxDescription = ({ updateShowAdd, updateMainObj, obj, mainObj }) => {
  // console.log("obj in drop Box description", obj);
  const [text, updateText] = useState({
    expense: "",
  });
  let members = obj.members;
  // console.log("<><//", members);

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
            // label= "Select all"
          />
          Select all
          <div style={{ paddingLeft: 15, paddingTop: 5, paddingBottom: 5 }}>
            {members.map((x, y) => {
              // for (let i in check) {
              //   if (check[i] === false) check.selectAll = false;
              // }
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
                      // console.log(e.target.value);
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
              let arr = {};

              // console.log("texte", text);
              // console.log("into this one more time");
              for (let i in check) {
                if (check[i] === true && i !== "selectAll") {
                  arr[i] = text[i];
                }
              }

              // console.log("<><<<<<<", { [text.expense]: arr });
              // console.log("object h bhai ye", obj);
              let temp = [...obj.expenses, { [text.expense]: arr }];
              obj.expenses = temp;
              // obj.expenses.push({ [text.expense]: arr });
              // console.log("main Object---> M>>M>", mainObj, obj);

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
