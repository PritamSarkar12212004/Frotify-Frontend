import React, { useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import { Alert, Stack } from "@mui/material";

function BudgetCreate({ setOpen, open }) {
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <div className="absolute top-2 z-30">
      {open ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            Budget Created Successfully
          </Alert>
        </Stack>
      ) : null}
    </div>
  );
}

export default BudgetCreate;
