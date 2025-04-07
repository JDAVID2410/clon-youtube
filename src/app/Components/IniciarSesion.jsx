"use client";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { auth } from "../Firebase/config";
import useStore from "@/store/UserStore";

export default function IniciarSesion() {
  const router = useRouter();
  const { loginUser } = useStore();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      loginUser(response.user);
      router.push("/perfil");
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-1 border border-gray-400 px-3 py-1.5 rounded-full text-blue-600 font-semibold hover:bg-gray-100"
    >
      <FaRegUserCircle size={18} />
      <span className="text-sm">Acceder</span>
    </button>
  );
}
