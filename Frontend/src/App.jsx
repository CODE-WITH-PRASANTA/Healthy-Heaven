import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Contact from "./Pages/Contact/Contact";
import Faq from "./Pages/Faq/Faq";
import Navbar from "./Components/Navbar/Navbar";
import Testimonial from "./Pages/Testimonial/Testimonial";
import MenuDetails from "./Pages/MenuDetails/MenuDetails";
import AboutUs from "./Pages/AboutUs/AboutUs";

const App = () => {
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/testimonial" element={<Testimonial/>} />
        <Route path="/menu-details" element={<MenuDetails/>} />
        <Route path="/about" element={<AboutUs/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;