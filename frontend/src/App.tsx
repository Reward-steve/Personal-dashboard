import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import Authentication from "./pages/Authentication/Authentication";
import MainContent from "./components/Main/MainContent";
import routerObject from "./router/Admin";
import SignUp from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { ApiProvider } from "./context/ApiProvider";
// import { ProtectedRoute } from "./utils/ProtectedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ApiProvider>
          <Routes>
            {/* Signup Page */}
            <Route path="/*" element={<Authentication />}>
              <Route index element={<Login />} />
              <Route path="Signup" element={<SignUp />} />
            </Route>

            {/* Dashboard Page */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard/*" element={<MainContent />}>
              {routerObject.map((route, id) => (
                <Route
                  key={id}
                  path={route.path}
                  element={<route.element {...route.props} />}
                />
              ))}
            </Route>
            {/* </Route> */}
          </Routes>
        </ApiProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
