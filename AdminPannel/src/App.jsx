import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import DashBoard from "./Pages/DashBoard/DashBoard";
import Gallery from "./Components/Gallery/Gallery";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>

          {/* Root */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashBoard/>}
          />

          <Route
            path="/gallery"
            element={<Gallery/>}
          />

          {/* Blog Create Route */}
          
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;