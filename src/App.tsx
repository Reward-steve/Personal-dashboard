import React from "react";
import routerObject from "./router/mainRoutes";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeProvider } from "./context/ThemeContext";
import MainContent from "./components/Main/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParentComponent from "./components/Main/ParentComponent";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ParentComponent>
          <Sidebar />
          <MainContent>
            <Header />
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
    </BrowserRouter>
  );
};

export default App;
