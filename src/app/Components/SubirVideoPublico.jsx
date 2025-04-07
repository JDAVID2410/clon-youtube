"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../Firebase/config";

export default function SubirVideoPublico() {
  const [titulo, setTitulo] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [subiendo, setSubiendo] = useState(false);

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

    setSubiendo(true);

    // 1. Subir a Cloudinary
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "videos_app"); // tu preset de Cloudinary

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dkqanprd8/video/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.secure_url) throw new Error("No se pudo obtener la URL de Cloudinary");

      const nuevoVideo = {
        title: titulo,
        url: data.secure_url,
        tipo: "publico",
        created_at: new Date().toISOString(),
      };

      // 2. Guardar en Firebase
      await push(ref(database, "publico/"), nuevoVideo);

      // Reset form
      setTitulo("");
      setVideoFile(null);
      setPreviewUrl("");
      alert("¡Video público subido correctamente!");
    } catch (error) {
      console.error("Error al subir video:", error);
      alert("Ocurrió un error al subir el video.");
    } finally {
      setSubiendo(false);
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
        accept="video/*"
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
        disabled={subiendo}
        className={`${
          subiendo ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded`}
      >
        {subiendo ? "Subiendo..." : "Subir video público"}
      </button>
    </div>
  );
}



