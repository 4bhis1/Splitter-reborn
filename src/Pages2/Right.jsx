import { ConstructionOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa";

const fetchData = async (group) => {
  const text = {
    token: window.localStorage.getItem("token"),
    groupid: group,
  };
  const data = await fetch(
    "http://localhost:4444/api/v1/expenses/getexpenses",
    {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("fetch error" + err);
    });

  return data;
};

const Right = ({ styles, group }) => {
  // console.log("group", group);

  let [data, updateData] = useState();

  useEffect( () => {
    fetchData(group).then((data)=>
    updateData(data["data"]));
  }, []);

  console.log("all ezpenses", data);

  return (
    <div style={styles}>
      <div style={{ backgroundColor: "greenYellow" }}>
        {data
          ? data.map((x) => {
              return <div style={{backgroundColor : "cyan", margin : 10, padding : 10}}>{x.expensename}</div>;
            })
          : void 0}
      </div>

      <div className="addGroup" style={{ backgroundColor: "blue" }}>
        {/* Add Expense */}
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

export default Right;
