"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../Firebase/config";

export default function SubirVideoPublico() {
  const [titulo, setTitulo] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("video")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const subirVideo = async () => {
    if (!titulo || !videoFile) {
      return alert("Por favor completa todos los campos");
    }

    const nuevoVideo = {
      title: titulo,
      url: previewUrl, 
      tipo: "publico",
      created_at: new Date().toISOString(),
    };

    try {
      await push(ref(database, "publico/"), nuevoVideo); // se guarda en la carpeta "publico"
      setTitulo("");
      setVideoFile(null);
      setPreviewUrl("");
      alert("¡Video público subido correctamente!");
    } catch (error) {
      console.error("Error al subir video:", error);
      alert("Ocurrió un error al subir el video.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Subir video público</h2>

      <input
        type="text"
        placeholder="Título del video"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="border px-4 py-2 mb-3 w-full rounded"
      />

      <input
        type="file"
        accept="video/mp4"
        onChange={handleFileChange}
        className="mb-3"
      />

      {previewUrl && (
        <video
          src={previewUrl}
          controls
          className="w-full rounded mb-4"
        />
      )}

      <button
        onClick={subirVideo}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Subir video público
      </button>
    </div>
  );
}


