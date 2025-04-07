import { useState } from "react";
import Bienvenida from "@/components/Bienvenida";
import Studio from "@/components/Studio";

export default function Perfil() {
  const [mostrarStudio, setMostrarStudio] = useState(false);

  return (
    <div>
      {mostrarStudio ? (
        <Studio />
      ) : (
        <Bienvenida onContinuar={() => setMostrarStudio(true)} />
      )}
    </div>
  );
}


