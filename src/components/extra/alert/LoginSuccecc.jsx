import React, { useState } from "react";
import AlertTitle from "@mui/material/AlertTitle";
import { Alert, Stack } from "@mui/material";

function LoginSuccecc({ setOpensss, opensss }) {
  setTimeout(() => {
    setOpensss(false);
  }, 3000);
  return (
    <div className="absolute top-4">
      {opensss ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            Login successfull
          </Alert>
        </Stack>
      ) : null}
    </div>
  );
}

export default LoginSuccecc;
