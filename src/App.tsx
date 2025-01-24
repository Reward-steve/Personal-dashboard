import React from "react";
import routerObject from "./router/mainRoutes";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "./context/ThemeContext";
import MainContent from "./components/Main/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParentComponent from "./components/Main/ParentComponent";
import { BackgroundProvider } from "./context/BackgroundContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BackgroundProvider>
        <ThemeProvider>
          <ParentComponent>
            <Sidebar />
            <MainContent>
              <Routes>
                {routerObject.map((route, id) => {
                  return (
                    <Route
                      key={id}
                      path={route.path}
                      element={<route.element {...route.props} />}
                    />
                  );
                })}
              </Routes>
            </MainContent>
          </ParentComponent>
        </ThemeProvider>
      </BackgroundProvider>
    </BrowserRouter>
  );
};

export default App;
