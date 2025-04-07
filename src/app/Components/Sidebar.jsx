"use client";

import { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { ImPlay } from "react-icons/im";
import { MdHome, MdSubscriptions, MdOutlineVideoLibrary, MdHistory } from "react-icons/md";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Barra de navegación */}
      <div className="flex p-4 justify-between items-center sticky top-0 bg-white z-50">
        {/* Sección izquierda (botón menú y logo) */}
        <div className="flex gap-5 items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            <CiMenuBurger />
          </button>
          <Link href="/">
            <div className="flex gap-2 items-center">
              <ImPlay size={25} fill="red" />
              <h1 className="text-black font-bold text-lg">YouTube</h1>
            </div>
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-5 transition-all duration-300 
        ${menuOpen ? "w-60" : "w-30"}`}
      >
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl mb-5">
          <AiOutlineMenu />
        </button>
        <nav className="flex flex-col py-10 gap-3">
          <Link href="/" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <MdHome size={22} />
            {menuOpen && <span>Principal</span>}
          </Link>
          <Link href="/shorts" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <PiYoutubeLogoLight size={22} />
            {menuOpen && <span>Shorts</span>}
          </Link>
          <Link href="/suscripciones" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <MdSubscriptions size={22} />
            {menuOpen && <span>Suscripciones</span>}
          </Link>
          <Link href="/library" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <MdOutlineVideoLibrary size={22} />
            {menuOpen && <span>Tú</span>}
          </Link>
          <Link href="/history" className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg">
            <MdHistory size={22} />
            {menuOpen && <span>Historial</span>}
          </Link>
        </nav>

        {/* Sección de "Acceder" (Solo se muestra cuando el menú está expandido) */}
        {menuOpen && (
          <div className="mt-5 border-t pt-3">
            <p className="text-sm text-gray-600">
              Accede para dar “Me gusta” a los videos, realizar comentarios y suscribirte.
            </p>
            <button className="flex items-center gap-2 border px-4 py-2 mt-3 rounded-full text-blue-600">
              <FaRegUserCircle size={22} />
              Acceder
            </button>
          </div>
        )}
      </div>
    </>
  );
}

