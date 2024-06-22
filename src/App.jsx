import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/register/Register";
import Start from "./components/start/Start";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Db from "./components/database/db";
import Services from "./components/services/Services";
import CompanyInfo from "./components/company/company";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/register" element={<Register />} />
          <Route path="/db" element={<Db />} />
          <Route path="/services" element={<Services />} />
          <Route path="/company" element={<CompanyInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
