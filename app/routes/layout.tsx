import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { Outlet, Link } from "react-router";

import Logo from "../assets/logo.png";
import Footer from "~/components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar
        isBlurred
        maxWidth="full"
        classNames={{
          base: "bg-white/10 backdrop-blur-xl backdrop-saturate-150 border-slate-800/50 px-2 sm:px-4 lg:px-8 sm:h-20 fixed top-0 left-0 right-0 z-50 w-full",
        }}
      >
        <NavbarContent justify="start">
          <NavbarBrand className="gap-4 w-full">
            <Link to="/" className="flex items-center justify-between gap-4">
              <img src={Logo} alt="Logo" className="h-12 w-12" />
              <p className="font-bold text-inherit">BG Remover</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>
      </Navbar>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
