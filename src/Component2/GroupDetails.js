import { Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";

function GroupDetails(props) {
  const { hide, hideFunc, data } = props;

  console.log("@@@@ in GroupDetails", hide, data);

  //   const { objectId } = useContext(Theme);

  const handleClose = () => {
    hideFunc(false);
  };

  const [text, updateText] = useState({
    expensename: "",
    amount: "",
    description: "",
  });

  return (
    <Dialog onClose={handleClose} open={hide}>
      {data && data.createdon ? (
        <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>
          <div style={{ fontSize: 30, paddingBottom: 20, marginRight: 100 }}>{data.groupname}</div>

          <div style={{ fontSize: 20 }}>Members</div>
          <div style={{ paddingLeft: 15, fontSize: 18 }}>
            {data && data.members && !!data.members.length ? (
              <div>
                {data.members.map((x, y) => {
                  return <div style={{ margin: 5 }}>{x.membersfirstname}</div>;
                })}
              </div>
            ) : (
              void 0
            )}
          </div>
          <div style={{ padding: 10, paddingLeft: 0 }}>
            <div>Created On</div>
            <div style={{ paddingLeft: 10 }}>{data.createdon.substring(0, 10)}</div>
          </div>
        </div>
      ) : (
        void 0
      )}
    </Dialog>
  );
}

export default GroupDetails;
