import React from "react";
import bannerImage from "../assets/images/home-page-banner.png";

const navItems = [
  { name: "Art Discovery", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "My Exhibitions", href: "/login" },
  // { name: "Shop", href: "/shop" },
];

const Header = () => {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 space-y-4 md:space-y-0">
          <a href="/">
            <h1 className="text-black text-4xl md:text-6xl font-black">V-Art</h1>
          </a>

          <nav>
            <ul className="flex flex-col md:flex-row md:space-x-8 items-center space-y-2 md:space-y-0">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-black capitalize text-lg md:text-xl tracking-wider hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="/login"
            className="bg-rose-500 text-white capitalize text-lg md:text-xl px-4 py-2 rounded transition-colors"
          >
            Login
          </a>
        </div>
      </header>

      <div className="pt-15">
        <div
          className="w-full h-96 bg-center bg-cover"
          style={{ backgroundImage: `url(${bannerImage})` }}
          aria-label="Banner"
        />
      </div>
    </>
  );
};

export default Header;
