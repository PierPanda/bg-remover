import { Outlet } from "react-router";
import Footer from "~/components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* <Navbar
        isBlurred
        maxWidth="full"
        classNames={{
          base: "bg-white/10 backdrop-blur-xl backdrop-saturate-150 border-slate-800/50 px-2 sm:px-4 lg:px-8 sm:h-20 fixed top-0 left-0 right-0 z-50 w-full",
        }}
      >
        <NavbarContent justify="start">
          <NavbarBrand className="gap-4 w-full">
            <div className="flex items-center justify-between gap-4">
              <img src={Logo} alt="Logo" className="h-12 w-12" />
              <p className="font-bold text-inherit">{nav.brandName}</p>
            </div>
          </NavbarBrand>
        </NavbarContent>
      </Navbar> */}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
