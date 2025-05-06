import React from "react";
import bannerImage from "../assets/images/home-page-banner.png";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Art Discovery", to: "/" },
  { name: "Collections", to: "/collections" },
  { name: "My Exhibitions", to: "/login" },
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
    <Link
      to={item.to}
      className="text-black capitalize text-xl tracking-wider hover:text-gray-600 transition-colors"
    >
      {item.name}
    </Link>
  </li>
))}
            </ul>
          </nav>

          <Link
  to="/login"
  className="bg-rose-500 text-white capitalize text-lg md:text-xl px-4 py-2 rounded transition-colors"
>
  Login
</Link>
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
