"use client";

import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineNotifications } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { ImPlay } from "react-icons/im";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Firebase/config";
import useStore from "@/store/UserStore";

export default function UserMenu({ onShowSubir }) {
  const [showCrearMenu, setShowCrearMenu] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { usuario, loginUser, logoutUser } = useStore();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      loginUser(result.user);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logoutUser();
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="relative flex items-center gap-5">
      {!usuario ? (
        <button
          onClick={handleLogin}
          className="flex items-center gap-1 border border-gray-400 px-3 py-1.5 rounded-full text-blue-600 font-semibold hover:bg-gray-100"
        >
          <FaRegUserCircle size={18} />
          <span className="text-sm">Acceder</span>
        </button>
      ) : (
        <>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => setShowCrearMenu(!showCrearMenu)}
            >
              <AiOutlinePlus size={18} />
              <span className="font-semibold">Crear</span>
            </button>
            {showCrearMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
                <button
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    onShowSubir?.();
                    setShowCrearMenu(false);
                  }}
                >
                  <ImPlay size={18} className="mr-2" />
                  Subir video
                </button>
              </div>
            )}
          </div>

          <button className="relative">
            <MdOutlineNotifications size={24} />
          </button>

          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
              <img
                src={usuario.photoURL}
                alt="Foto de perfil"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                <div className="flex items-center gap-3 border-b pb-3 mb-3">
                  <img
                    src={usuario.photoURL}
                    alt="Foto de perfil"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{usuario.displayName}</p>
                    <p className="text-sm text-gray-500">{usuario.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => (window.location.href = "/perfil")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-200 rounded-lg"
                >
                  Perfil
                </button>

                <button className="w-full text-left py-2 px-3 hover:bg-gray-200 rounded-lg">
                  Cuenta de Google
                </button>

                <button className="w-full text-left py-2 px-3 hover:bg-gray-200 rounded-lg">
                  Cambiar de cuenta
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 hover:bg-gray-200 rounded-lg text-red-600"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

