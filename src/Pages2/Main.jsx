import { Dialog } from "@mui/material";
import React, { useState } from "react";
import Left from "./Left";
import Nav from "./Nav";
import Right from "./Right";

function Group(props) {
  const { groupHide, updateGroupHide } = props;

  const handleClose = () => {
    updateGroupHide(false);
  };
  let [count, updateCount] = useState(1);
  let [groupName, updateGroupName] = useState("");
  let [text, updateText] = useState({});

  return (
    <Dialog onClose={handleClose} open={groupHide}>
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
          required={true}
        />
        <br />
        <br />
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            height: 200,
            backgroundColor: "blue",
            // width: 200,
            overflow: "scroll",
            // scroll
          }}
        >
          <div style={{ display: "flex" }}>
            <input type="text" value={`You`} readOnly />
            <input type="Number" value={window.localStorage.getItem("phone")} readOnly />
          </div>
          {Array(count)
            .fill()
            .map((x, y) => {
              let data = "Mem" + y;
              let phone = "Phn" + y;
              return (
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    placeholder={`Member ${y + 2}`}
                    value={text.data}
                    onChange={(e) => {
                      // text[data] = e.target.value;
                      updateText({ ...text, [data]: e.target.value });
                    }}
                  />
                  <input
                    type="Number"
                    placeholder={`Member ${y + 2}'s Phone Number`}
                    value={text.phone}
                    onChange={(e) => {
                      // text[data] = e.target.value;
                      updateText({ ...text, [phone]: e.target.value });
                    }}
                  />
                </div>
              );
            })}
        </div>
        <div
          onClick={() => {
            updateCount((e) => e + 1);
          }}
          style={{ display: "flex", justifyContent: "right" }}
        >
          Add Member
        </div>
        <button
          onClick={() => {
            let obj = [{ membersfirstname: "You", phone: window.localStorage.getItem("phone") }];
            for (let i = 0; i < Object.keys(text).length / 2; i++) {
              // console.log(i)

              let tempName = text[`Mem${i}`];
              console.log("tempName", tempName);
              tempName = tempName.trim();
              let temp = {
                membersfirstname: tempName.substr(
                  0,
                  tempName.indexOf(" ") > 1 ? tempName.indexOf(" ") : tempName.length
                ),
                phone: parseInt(text[`Phn${i}`]),
              };

              obj.push(temp);
            }
            console.log("---> object to temp", obj);
            console.log(parseInt(Math.random() * 1000));
            console.log(window.localStorage.getItem("token"));
            let data;
            fetch("http://localhost:4444/api/v1/groups/creategroup", {
              method: "POST",
              headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                groupname: groupName,
                members: obj,
                image: 18,
              }),
            })
              .then((response) => {
                data = response.json();
              })
              .catch((err) => {
                console.log("fetch error" + err);
              });

            // console.log("data",data);

            updateGroupHide(false);
          }}
        >
          Submit
        </button>
      </div>
    </Dialog>
  );
}

function ExpenseGroup(props) {
  const { expenseHide, updateExpenseHide, data: tempData } = props;

  const [text, updateText] = useState({
    expense: "",
  });

  let data = tempData && tempData.members;
  console.log("data from expenseGroup dialog", data);

  let [SelectAll, updateSelectAll] = useState({ selectAll: false });

  if (SelectAll[0] === undefined) {
    console.log("Must render first time");
    for (let i in data) {
      SelectAll[i] = false;
    }
  }

  if (SelectAll["selectAll"]) {
    for (let i in data) {
      SelectAll[i] = true;
    }
    console.log("inside this", SelectAll);
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
                    // console.log(check[y])
                    // SelectAll ? updateCheck({...check,[y] : true}) : void 0
                    return (
                      <div key={y} style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <input
                            type="checkbox"
                            // checked={SelectAll ? true : false}
                            checked={SelectAll[y]}
                            onChange={() => {
                              updateSelectAll({ ...SelectAll, [y]: !SelectAll[y], ["selectAll"]: false });
                            }}
                          />
                          {x.membersfirstname}
                        </div>
                        <input type="number" style={{ width: 30 }} />
                      </div>
                    );
                  })
                : void 0}
            </div>
            <button
            // onClick={() => {
            //   let arr = [];

            //   for (let i in check) {
            //     if (check[i] === true && i !== "selectAll") {
            //       const temp = { Name: i, Amount: parseInt(text[i]) };
            //       arr = [...arr, temp];
            //     }
            //   }

            //   obj.expenses = [...obj.expenses, { [text.expense]: arr }];

            //   const { result, avg } = Calculate(arr);

            //   obj.result = [...obj.result, result];
            //   obj.avg = [...obj.avg,avg];

            //   updateMainObj([...mainObj]);
            //   updateShowAdd(false);
            // }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

const Main = () => {
  let [groupToNavigate, updateGroupToNavigate] = useState();

  let [expenseHide, updateExpenseHide] = useState(false);
  let [groupHide, updateGroupHide] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "#c0c0c0" }}>
      <Nav
        styles={{
          width: "100%",
          backgroundColor: "white",
          maxHeight: 50,
          minHeight: "10%",
        }}
      />
      <div style={{ display: "flex", height: "90%" }}>
        <Left
          styles={{ width: "40%", backgroundColor: "white" }}
          updateGroupToNavigate={updateGroupToNavigate}
          updateGroupHide={updateGroupHide}
        />
        <Right
          styles={{ width: "60%", backgroundColor: "rgb(243 239 239)" }}
          groupToNavigate={groupToNavigate}
          updateExpenseHide={updateExpenseHide}
        />
      </div>

      <Group groupHide={groupHide} updateGroupHide={updateGroupHide} />
      <ExpenseGroup expenseHide={expenseHide} updateExpenseHide={updateExpenseHide} data={groupToNavigate} />
    </div>
  );
};

export default Main;
