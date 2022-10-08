import { Dialog } from "@mui/material";
import React, { useState } from "react";

function CashInDialog(props) {
  const [hide, updateHide] = useState(false);

  const handleClose = () => {
    updateHide(false);
  };

  return (
    <Dialog onClose={handleClose} open={hide}>
      <div>Cash In Dialog</div>
    </Dialog>
  );
}

export default CashInDialog;
