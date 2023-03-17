import * as React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "../style/App.css";
import { useMediaQuery } from "@mui/material";
import Banner from "./Banner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
