"use client";

import { useState } from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { MdHome, MdSubscriptions, MdOutlineVideoLibrary, MdHistory,} from "react-icons/md";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { AiOutlineMenu } from "react-icons/ai";

import SearchBar from "./SearchBar";
import IniciarSesion from "./IniciarSesion";
import UserMenu from "./UserMenu";

import useStore from "@/store/UserStore";
import { ImPlay } from "react-icons/im";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { usuario } = useStore();

  return (
    <>
      {/* Barra superior */}
      <div className="flex p-4 justify-between items-center sticky top-0 bg-white shadow-md z-50">
        {/* Izquierda */}
        <div className="flex gap-5 items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            <CiMenuBurger />
          </button>
          <Link href="/">
            <div className="flex gap-2 items-center">
              <ImPlay size={25} fill="red" />
              <h1 className="text-black font-semibold text-xl tracking-tight">YouTube</h1>
            </div>
          </Link>
        </div>

        {/* Centro */}
        <SearchBar />

        {/* Derecha */}
        {usuario ? <UserMenu /> : <IniciarSesion />}
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
      </div>
    </>
  );
}















