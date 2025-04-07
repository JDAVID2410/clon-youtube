"use client";

import { useEffect, useState } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import { database } from "../Firebase/config";
import useStore from "@/store/UserStore";
import { FiTrash2 } from "react-icons/fi";

export default function Perfil() {
  const { usuario } = useStore();
  const [titulo, setTitulo] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const videosRef = ref(database, "videos/");
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const videosConId = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        setVideos(videosConId);
      } else {
        setVideos([]);
      }
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("video")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const subirVideo = async () => {
    if (!titulo || !videoFile) return alert("Faltan campos");

    const nuevoVideo = {
      title: titulo,
      url: previewUrl, // vista previa local, no sube el archivo real
      uid: usuario.uid,
      created_at: new Date().toISOString(),
      user: {
        name: usuario.displayName,
      },
    };

    try {
      await push(ref(database, "videos/"), nuevoVideo);
      setTitulo("");
      setVideoFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.log("Error al subir video:", error);
    }
  };

  const eliminarVideo = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este video?");
    if (!confirmar) return;

    try {
      await remove(ref(database, `videos/${id}`));
    } catch (error) {
      console.log("Error al eliminar video:", error);
    }
  };

  return (
    <div className="ml-72 p-6">
      <h1 className="text-2xl font-bold mb-4">YouTube Studio</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Subir nuevo video</h2>
        <input
          type="text"
          placeholder="Título del video"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border px-4 py-2 mb-2 w-full rounded"
        />

        <input
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          className="mb-4"
        />

        {previewUrl && (
          <video
            src={previewUrl}
            controls
            className="w-full h-48 mb-4 rounded"
          />
        )}

        <button
          onClick={subirVideo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Subir video
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-100 p-3 rounded shadow">
            <video src={video.url} controls className="w-full h-48 rounded" />

            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="font-semibold">{video.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(video.created_at).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => eliminarVideo(video.id)}>
                <FiTrash2 size={18} className="text-red-600 hover:text-red-800" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-1">Por: {video.user?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}












