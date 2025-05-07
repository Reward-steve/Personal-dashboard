import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication/Authentication";
import MainContent from "./components/Main/MainContent";
import routerObject from "./router/Admin";
import { ApiProvider } from "./context/ApiProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute"; // Adjust the path as needed
import { AuthProvider } from "./context/AuthProvider";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApiProvider>
          <ThemeProvider>
            <Routes>
              {/* Signup Page */}
              <Route path="/auth/*" element={<Authentication />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/*" element={<MainContent />}>
                  {routerObject.map((route, id) => (
                    <Route
                      key={id}
                      path={route.path}
                      element={<route.element {...route.props} />}
                    />
                  ))}
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </ApiProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
