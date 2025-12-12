import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Logo from "~/assets/logo.png";

export default function App() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <img src={Logo} alt="Logo" className="h-12 w-12" />
        <p className="font-bold text-inherit">BG Remover</p>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}
