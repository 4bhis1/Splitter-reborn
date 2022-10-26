import React, { useContext, useEffect, useState } from "react";
import "./Left.css";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { AiOutlineMore } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { BsPinAngleFill } from "react-icons/bs";

import { ip } from "../config";

import { Theme } from "../Context/Provider";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { padding } from "@mui/system";

const fetchData = async () => {
  const text = {
    token: window.localStorage.getItem("token"),
    phone: window.localStorage.getItem("phone"),
  };

  if (text.token === undefined && text.phone === undefined) return void 0;

  const data = await fetch(`${ip}/api/v1/groups/showgroup`, {
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

  // console.log("????? ==-> data", data);

  return data;
};

// let data;
const Left = ({ styles, updateGroupToNavigate, updateGroupHide, groupToNavigate, groupHide }) => {
  let userData = useContext(Theme);

  let [data, updateData] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchData().then((data) => updateData(data["dataAsPerPhone"]));
  }, [groupHide]);

  // console.log("??? data in left", data);

  return (
    <div style={{ ...styles, position: "relative", display: "flex", flexDirection: "column" }}>
      {/* navigation */}
      <div
        style={{
          height: 40,
          backgroundColor: "Green",
          padding: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopLeftRadius: 10,
          // opacity: 0,
        }}
      >
        <Avatar>{userData["firstname"][0]}</Avatar>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="aiOutlineMore"
            style={{
              fontWeight: "bolder",
              display: "flex",
              alignItems: "center",
              fontSize: 25,
              // backgroundColor: "yellow",
              marginRight: 10,
            }}
          >
            <div
              style={{
                backgroundColor: "yellow",
                fontSize: 10,
                borderRadius: "100%",
                padding: 3,
                position: "absolute",
                top: 13,
                right: 45,
              }}
            >
              20
            </div>
            <IoNotifications />
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ padding: 0, margin: 0, minWidth: 0, lineHeight: 1, color: "black" }}
          >
            <div className="aiOutlineMore" style={{ fontWeight: "bolder", fontSize: 30 }}>
              <AiOutlineMore />
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Night Mode</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>New Group</MenuItem>

            <MenuItem
              onClick={() => {
                const { updateLogin } = userData;

                updateLogin(false);
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("phone");

                handleClose();
              }}
            >
              Logout
            </MenuItem>
            <MenuItem onClick={handleClose}>About</MenuItem>
          </Menu>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "scroll", overflowX: "hidden" }}>
        <div
          style={{
            backgroundColor: groupToNavigate && groupToNavigate["PE"] ? "rgb(200,200,210)" : "rgb(230,230,230)",
            margin: 10,
            padding: 30,
            borderRadius: 8,
            wordBreak: "break-word",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            marginBottom: 30,
            // flex: 1,
          }}
          onClick={() => updateGroupToNavigate({ PE: true })}
        >
          Personal Expense
        </div>
        {data ? (
          <div>
            {data.map((x, y) => {
              // console.log("members",x.members)
              return (
                <div
                  key={y}
                  style={{
                    backgroundColor:
                      groupToNavigate && groupToNavigate["groupname"] === x.groupname
                        ? "rgb(200,200,210)"
                        : "rgb(230,230,230)",
                    margin: 10,
                    padding: 30,
                    borderRadius: 8,
                    wordBreak: "break-word",
                    cursor: "pointer",
                  }}
                  onClick={() => updateGroupToNavigate({ ...x })}
                >
                  {x["groupname"]}
                </div>
              );
            })}
          </div>
        ) : (
          void 0
        )}
      </div>
      <div
        className="addGroup"
        style={{
          backgroundColor: "#a3d9a3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 30,
          padding: 15,
          margin: 10,
          marginBottom: 0,
        }}
        onClick={() => {
          updateGroupHide(true);
        }}
      >
        <FaPlus />
      </div>
    </div>
  );
};

export default Left;
