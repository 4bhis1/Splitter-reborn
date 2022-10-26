import React, { useContext, useState } from "react";
import ExpenseGroup from "../Component2/ExpenseGroupDialog";
import Group from "../Component2/GroupDialog";
import Left from "./Left";
import Nav from "./Nav";
import Right from "./Right";

import { Theme } from "../Context/Provider";
import ColorMode from "../Theme/ColorMode";

const Main = () => {
  let { themeMode } = useContext(Theme);

  let [groupToNavigate, updateGroupToNavigate] = useState();

  let [expenseHide, updateExpenseHide] = useState(false);
  let [groupHide, updateGroupHide] = useState(false);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "30%",
          zIndex: 0,
          backgroundColor: ColorMode(themeMode, "mainBackgroundTop"),
          // opacity: 0.6,
        }}
      />

      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: ColorMode(themeMode, "mainBackgroundBottom"),
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* <Nav
        styles={{
          width: "100%",
          backgroundColor: "white",
          maxHeight: 50,
          minHeight: "10%",
          borderBottom: "solid",
        }}
      /> */}

        <div
          style={{
            display: "flex",
            height: "98%",
            width: "95%",
            position: "relative",
            marginTop: "2%",
            borderTopLeftRadius: 10,
          }}
        >
          <Left
            styles={{ width: "35%", backgroundColor: "white", borderRight: "solid", borderTopLeftRadius: 10 }}
            updateGroupToNavigate={updateGroupToNavigate}
            groupToNavigate={groupToNavigate}
            groupHide={groupHide}
            updateGroupHide={updateGroupHide}
          />
          <Right
            styles={{ width: "65%", backgroundColor: "rgb(243 239 239)", height: "100%" }}
            groupToNavigate={groupToNavigate}
            updateExpenseHide={updateExpenseHide}
            expenseHide={expenseHide}
          />
        </div>

        <Group groupHide={groupHide} updateGroupHide={updateGroupHide} />
        <ExpenseGroup expenseHide={expenseHide} updateExpenseHide={updateExpenseHide} data={groupToNavigate} />
      </div>
    </div>
  );
};

export default Main;
