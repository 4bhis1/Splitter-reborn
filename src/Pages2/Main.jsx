import React, { useState } from "react";
import ExpenseGroup from "../Component2/ExpenseGroupDialog";
import Group from "../Component2/GroupDialog";
import Left from "./Left";
import Nav from "./Nav";
import Right from "./Right";

const Main = () => {
  let [groupToNavigate, updateGroupToNavigate] = useState();

  let [expenseHide, updateExpenseHide] = useState(false);
  let [groupHide, updateGroupHide] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "#c0c0c0", overflow: "hidden" }}>
      <Nav
        styles={{
          width: "100%",
          backgroundColor: "white",
          maxHeight: 50,
          minHeight: "10%",
          borderBottom: "solid",
        }}
      />
      <div style={{ display: "flex", height: "90%" }}>
        <Left
          styles={{ width: "35%", backgroundColor: "white", borderRight: "solid" }}
          updateGroupToNavigate={updateGroupToNavigate}
          updateGroupHide={updateGroupHide}
        />
        <Right
          styles={{ width: "65%", backgroundColor: "rgb(243 239 239)" }}
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
