/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router";

function Navbar({ position, background }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`${position === "absolute" ? "absolute z-10 top-0 left-0" : "relative"} ${background ? background : ""} flex justify-between w-full text-white font-bold py-[1em] px-[1em]`}>
        {/* Logo */}
        <Link to="/" className="flex-1"><h1 className="uppercase">Travel the world</h1></Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex justify-around flex-1">
          <Link to="/product" className="inline-block">Product</Link>
          <Link to="/pricing" className="inline-block">Pricing</Link>
          <Link to="/login" className="inline-block active-btn">Login</Link>
        </div>

        {/* Bottone hamburger per mobile */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-white focus:outline-none cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* Overlay per il menu mobile */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)}></div>

      {/* Side Panel per Mobile */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Bottone Chiudi */}
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Link del menu mobile */}
        <ul className="mt-10 space-y-4 text-lg">
          <li><Link to="/product" className="block cursor-pointer" onClick={() => setIsOpen(false)}>Product</Link></li>
          <li><Link to="/pricing" className="block cursor-pointer" onClick={() => setIsOpen(false)}>Pricing</Link></li>
          <li><Link to="/login" className="block cursor-pointer active-btn" onClick={() => setIsOpen(false)}>Login</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
