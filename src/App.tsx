import React from "react";
import Header from "./components/Header/Header";
// import WeatherWidget from "./components/Widgets/WeatherWidget/WeatherWidget";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/Main/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlexPage from "./components/StyleComponent/FlexPage";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FlexPage>
        <Sidebar />
        <MainContent>
          <Header />
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/Analytics" element={<h1>Analytics</h1>} />
            <Route path="/Profile" element={<h1>Profile</h1>} />
            <Route path="/Setting" element={<h1>Settings</h1>} />
          </Routes>
        </MainContent>
      </FlexPage>
    </BrowserRouter>
  );
};

export default App;
