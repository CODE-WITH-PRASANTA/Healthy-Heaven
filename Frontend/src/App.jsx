import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Contact from "./Pages/Contact/Contact";
import Faq from "./Pages/Faq/Faq";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/faq" element={<Faq/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;