import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar />
      <main id="main-content" key={pathname} className="animate-pageFadeIn">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
