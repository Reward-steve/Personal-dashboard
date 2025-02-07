import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login/Login";
import MainContent from "./components/Main/MainContent";
import routerObject from "./router/mainRoutes"; // Import the routes

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Dashboard Page */}
          <Route path="/dashboard/*" element={<MainContent />}>
            {routerObject.map((route, id) => (
              <Route
                key={id}
                path={route.path}
                element={<route.element {...route.props} />}
              />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
