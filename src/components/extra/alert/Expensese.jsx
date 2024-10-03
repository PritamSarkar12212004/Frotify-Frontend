import React, { useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import { Alert, Stack } from "@mui/material";

function Expensese({setOpen,open}) {
  
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <div className="absolute top-4">
      {open ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            This is a filled success Alert.
          </Alert>a
        </Stack>
      ) : null}
    </div>
  );
}

export default Expensese;
