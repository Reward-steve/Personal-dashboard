import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./components/Main/MainContent";
import routerObject from "./pages/Admin/AdminData";
import { ApiProvider } from "./context/ApiProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ProtectedRoute } from "./utils/ProtectedRoute";
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
              <Route element={<ProtectedRoute />}>
                {/* Authentication Page */}
                <Route path="/auth/login" element={<Login />}></Route>
                <Route path="/auth/signup" element={<SignUp />}></Route>

                {/* Dashboard Page */}
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
