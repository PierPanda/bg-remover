import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";

import Logo from "../assets/logo.png";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand className="gap-4">
          <img src={Logo} alt="Logo" className="h-12 w-12" />
          <p className="font-bold text-inherit">BG Remover</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
    </Navbar>
  );
}
