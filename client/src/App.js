import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
//  import { CssBaseLine, ThemeProvider } from "@mui/material"; // somehow cssbaseline cannot be imported from here
import { ThemeProvider } from "@mui/material"; // import only provider from here 
import CssBaseLine from '@mui/material/CssBaseline'; // import cssbaseline spacifically from here this is how it is working
// import ThemeProvider from '@mui/material/styles/ThemeProvider' // this is an option but keeping as per video tutorial and not using it
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";


function App() {
  // grab the mode of redux state
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));



  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <CssBaseLine />
          <Routes>
            <Route path="/" element={ isAuth? <Navigate to = "/home" /> :  <LoginPage />} />
            <Route path="/home" element={ isAuth? <HomePage /> : <Navigate to = "/" />} />
            <Route path="/porfile/:userId" element={ isAuth? <ProfilePage /> : <Navigate to = "/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;
