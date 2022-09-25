import { Dialog } from "@mui/material";
import { useState } from "react";

function ExpenseGroup(props) {
  const { expenseHide, updateExpenseHide, data: tempData } = props;

  console.log("--->tempdata", tempData);

  const [text, updateText] = useState({
    expense: "",
  });

  let data = tempData && tempData.members;

  let [SelectAll, updateSelectAll] = useState({ selectAll: false });
  //   let [text,updateText]=useState({})

  if (SelectAll[0] === undefined) {
    // console.log("Must render first time");
    for (let i in data) {
      SelectAll[i] = false;
      text[i] = "";
    }
  }

  if (SelectAll["selectAll"]) {
    for (let i in data) {
      SelectAll[i] = true;
      text[i]=text[i] ? text[i] : 0
    }
    // console.log("inside this", SelectAll);
  } else {
    let bool = false;

    for (let i in SelectAll) {
      if (SelectAll[i]) bool = true;
      else bool = false;
    }

    if (bool) updateSelectAll({ ...SelectAll, ["selectAll"]: true });
  }

  const handleClose = () => {
    updateExpenseHide(false);
  };

  return (
    <Dialog onClose={handleClose} open={expenseHide}>
      <div className="inputShow">
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
          <div>
            <input
              type="checkbox"
              onChange={() => {
                updateSelectAll({ ...SelectAll, ["selectAll"]: !SelectAll["selectAll"] });
              }}
              checked={SelectAll["selectAll"]}
            />
            SelectAll
            <div style={{ paddingLeft: "25px" }}>
              {data
                ? data.map((x, y) => {
                    // console.log("text on",y,text[y],text)
                    return (
                      <div key={y} style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <input
                            type="checkbox"
                            // checked={SelectAll ? true : false}
                            checked={SelectAll[y]}
                            onChange={() => {
                              updateSelectAll({ ...SelectAll, [y]: !SelectAll[y], ["selectAll"]: false });
                              !SelectAll[y] ? updateText({ ...text, [y]: 0 }) : updateText({ ...text, [y]: "" });
                            }}
                          />
                          {x.membersfirstname}
                        </div>
                        <input
                          type="number"
                          style={{ width: 40 }}
                          placeholder="0"
                          value={text[y]}
                          onChange={(e) => {
                            if (e.target.value) updateSelectAll({ ...SelectAll, [y]: true });
                            updateText({ ...text, [y]: e.target.value });
                          }}
                        />
                      </div>
                    );
                  })
                : void 0}
            </div>
            <button
              onClick={() => {
                  console.log("text", text);
                  console.log("check", SelectAll);
                  let arr = [];
                  
                  for (let i in SelectAll) {
                      if (SelectAll[i] === true && i !== "selectAll") {
                          console.log("Select All", SelectAll[i]);
                          console.log("data [ i ]", i, data[i]);
                          const temp = { name: data[i]["membersfirstname"], amount: parseInt(text[i]), phone: data[i].phone };
                          arr.push(temp);
                        }
                    }
                    
                    console.log("array", arr);
                    
                    fetch("http://localhost:4444/api/v1/expenses/createexpense", {
                        method: "POST",
                        headers: {
                            Accept: "application.json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: window.localStorage.getItem("token"),
                            expensename: text["expense"],
                            groupid: tempData["id"],
                            expense: arr,
                            image: 18,
                        }),
                    })
                    .then((response) => {
                        data = response.json();
                    })
                    .catch((err) => {
                        console.log("fetch error" + err);
                    });
                    handleClose();
                }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ExpenseGroup;
