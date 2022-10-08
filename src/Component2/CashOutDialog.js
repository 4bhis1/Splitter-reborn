import { Dialog } from "@mui/material";
import React, { useState } from "react";

export const CashOutDialog = () => {
  const [hide, updateHide] = useState(false);

  const handleClose = () => {
    updateHide(false);
  };

  return (
    <Dialog onClose={handleClose} open={hide}>
      <div>Cash out Dialog</div>
    </Dialog>
  );
};
