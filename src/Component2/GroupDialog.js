import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";
import { currentDate } from "../lib/PureFunctions";

function Group(props) {
  const { groupHide, updateGroupHide } = props;

  const { firstname } = useContext(Theme);

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
          // paddingRight: "10px",
          // paddingLeft: "10px",
          // paddingTop: "5px",
          padding: 20,
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
                <div key={y} style={{ display: "flex" }}>
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
            let obj = [{ membersfirstname: firstname, phone: parseInt(window.localStorage.getItem("phone")) }];
            for (let i = 0; i < Object.keys(text).length / 2; i++) {
              let tempName = text[`Mem${i}`];
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

            let data;

            fetch(`${ip}/api/v1/groups/creategroup`, {
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
                createdon: {
                  date: currentDate()["date"],
                  month: currentDate()["month"],
                  year: currentDate()["year"],
                },
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

export default Group;
