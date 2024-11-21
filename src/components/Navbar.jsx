import React from "react";
import Logo from "../asset/Logo.svg";

const Navbar = () => {
  return (
    <div className="px-3 py-3">
      <img src={Logo} alt="syncsystems" className="w-22 h-22" />
    </div>
  );
};

export default Navbar;
