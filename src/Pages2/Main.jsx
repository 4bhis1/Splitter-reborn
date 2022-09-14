import React, { useState } from "react";
import Left from "./Left";
import Nav from "./Nav";
import Right from "./Right";

const Main = () => {
  let [group, updateGroup] = useState();



  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "#c0c0c0" }}
    >
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
          styles={{ width: "40%", backgroundColor: "cyan" }}
          updateGroup={updateGroup}
        />
        <Right styles={{ width: "60%", backgroundColor: "tomato" }} group={group}/>
      </div>

        {/* <Dialog /> */}

    </div>
  );
};

export default Main;
