import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ApiProvider } from "./context/ApiProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeProvider";
import Authentication from "./pages/Authentication/Authentication";
import MainContent from "./components/Main/MainContent";
import routerObject from "./router/Admin";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ApiProvider>
          <ThemeProvider>
            <Routes>
              {/* Dashboard Page */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/*" element={<MainContent />}>
                  {routerObject.map((route, id) => (
                    <Route
                      key={id}
                      path={route.path}
                      element={<route.element {...route.props} />}
                    />
                  ))}
                </Route>
              </Route>
              {/* Signup Page */}
              <Route path="/*" element={<Authentication />}>
                <Route index element={<Login />} />
                <Route path="Signup" element={<SignUp />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </ApiProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
