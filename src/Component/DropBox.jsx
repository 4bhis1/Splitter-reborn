import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import Logo from "../Theme/Logo";

import "./Dropbox.css";

const DropBox = ({ updateMainObj, updateShowAdd, obj }) => {
  let [count, updateCount] = useState(1);

  let [groupName, updateGroupName] = useState("");

  let [text, updateText] = useState({});

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
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => {
              updateGroupName(e.target.value);
            }}
          />
          <br />
          <br />

          {Array(count)
            .fill()
            .map((x, y) => {
              let data = "Mem" + y;
              return (
                <input
                  type="text"
                  placeholder={`Member ${y + 1}`}
                  value={text.data}
                  onChange={(e) => {
                    // text[data] = e.target.value;
                    updateText({ ...text, [data]: e.target.value });
                  }}
                />
              );
            })}
          <div
            onClick={() => {
              updateCount((e) => e + 1);
            }}
          >
            Add Member
          </div>
          <button
            onClick={() => {
              let tempObj = {
                [groupName]: {
                  logo: Logo[Math.floor(Math.random() * Logo.length)],
                  members: Object.values(text),
                },
              };
              updateMainObj([...obj, tempObj]);
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

export default DropBox;
