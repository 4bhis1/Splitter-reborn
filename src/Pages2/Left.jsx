import React from "react";
import "./Left.css";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";

const fetchData = async () => {
  const text = {
    token: window.localStorage.getItem("token"),
    phone: window.localStorage.getItem("phone"),
  };

  if (text.token === undefined && text.phone === undefined) return void 0;

  const data = await fetch("http://localhost:4444/api/v1/groups/showgroup", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("fetch error" + err);
    });

  return data;
};

// let data;
const Left = ({ styles, updateGroup }) => {
  // console.log("renders")

  let [data, updateData] = useState();

  useEffect(() => {
    fetchData().then((data) => updateData(data["dataAsPerPhone"]));
  }, []);

  console.log("data", data);

  return (
    <div style={{ ...styles, position: "relative" }}>
      {data ? (
        <div>
          {data.map((x) => {
            return (
              <div
                style={{
                  backgroundColor: "blue",
                  margin: 10,
                  padding: 10,
                  borderRadius: 8,
                  wordBreak: "break-word",
                  cursor: "pointer",
                }}
                onClick={() => updateGroup(x._id)}
              >
                {x["groupname"]}
              </div>
            );
          })}
        </div>
      ) : (
        void 0
      )}
      <div className="addGroup" style={{ backgroundColor: "blue" }}>
        {/* Add Group */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 3,
          }}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

export default Left;
