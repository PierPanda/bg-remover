import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Outlet, Link } from "react-router";

import Logo from "../assets/logo.png";
import Footer from "~/components/Footer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar>
        <NavbarContent>
          <NavbarBrand className="gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img src={Logo} alt="Logo" className="h-12 w-12" />
              <p className="font-bold text-inherit">BG Remover</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        </NavbarContent>
      </Navbar>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
