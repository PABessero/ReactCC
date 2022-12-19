import * as React from "react";
import { createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import "../style/App.css";
import { useMediaQuery } from "@mui/material";
import Socket from "./Socket";
import { useState } from "react";
import Banner from "./Banner";
import ComputerCard from "./ComputerCard";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [wsMessage, updateWsMessage] = useState([]);
  const [computerList, updateComputerList] = useState([]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Banner />
      <main>Test</main>
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
    </ThemeProvider>
  );
}

export default App;
