import { Grid } from "@mui/material";
import ComputerCard from "./ComputerCard";
import Socket from "./Socket";
import * as React from "react";
import { useState } from "react";

function Dashboard() {
  const [wsMessage, updateWsMessage] = useState([]);
  const [computerList, updateComputerList] = useState([]);

  return (
    <div>
      <main>Test</main>
      <h2>Dashboard</h2>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {computerList.map((computer) => (
          <ComputerCard
            key={computer.uuid}
            computerID={computer.uuid}
            computerType={computer.type}
          />
        ))}
      </Grid>
      <Socket
        wsMessage={wsMessage}
        updateWsMessage={updateWsMessage}
        computerList={computerList}
        updateComputerList={updateComputerList}
      ></Socket>
    </div>
  );
}
export default Dashboard;
