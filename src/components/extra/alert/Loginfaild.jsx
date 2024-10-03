
import React, { useState } from "react";
import { Alert, Stack } from "@mui/material";

function Loginfaild({ setOpen, open }) {
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  return (
    <div className="absolute top-4">
      {open ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Login failed please check your email
          </Alert>
        </Stack>
      ) : null}
    </div>
  );
}

export default Loginfaild;

