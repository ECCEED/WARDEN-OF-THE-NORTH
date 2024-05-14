import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Add_product from "./scenes/add_product";
import Add_Contract from "./scenes/add_contract";
import AllProducts from "./scenes/all_products";
import FAQ from "./scenes/faq";
import Login from "./scenes/login/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import AllContracts from "./scenes/all_contracts";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/login-admin";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoginPage ? null : <Sidebar isSidebar={isSidebarVisible} />}
          <main className="content">
            {isLoginPage ? null : <Topbar setIsSidebar={setIsSidebarVisible} />}
            <Routes>
              {/* Redirect to login page if the user is not authenticated */}
              <Route path="/" element={<Navigate to="/login-admin" />} />
              <Route path="/login-admin" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/add_product" element={<Add_product />} />
              <Route path="/add_contract" element={<Add_Contract/>} />
              <Route path="/all_products" element={<AllProducts />} />
              <Route path="/all_contracts" element={<AllContracts />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
