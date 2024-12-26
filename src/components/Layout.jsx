import React, { useState } from "react";
import Home from "../pages/Home";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import axios from "axios";
const Layout = () => {
  const [theme, setTheme] = useState(true);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }
  return (
    <div
      className={`${
        theme === true
          ? "bg-slate-100 text-black"
          : "bg-slate-700 text-blue-950"
      }`}
    >
      <div className="flex justify-end gap-2 p-2">
        <span>Dark</span>
        <input
          type="checkbox"
          className="toggle"
          defaultChecked
          onChange={() => setTheme(!theme)}
        />
        <span>light</span>
      </div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Layout;
