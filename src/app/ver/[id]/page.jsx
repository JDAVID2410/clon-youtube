"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaBell, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export default function VerVideo() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [suscrito, setSuscrito] = useState(false);

  useEffect(() => {
    const obtenerVideos = async () => {
      const res = await fetch("/data/videosPublicos.json");
      const data = await res.json();
      setVideo(data[id]);
    };

    obtenerVideos();
  }, [id]);

  if (!video) return <p className="ml-20 p-6">Cargando video...</p>;

  return (
    <div className="ml-20 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Reproductor */}
        <div className="relative pb-[56.25%] mb-4">
          <video
            src={video.url}
            controls
            className="absolute w-full h-full rounded-lg"
          />
        </div>

        {/* Título */}
        <h1 className="text-xl font-semibold mb-4">{video.title}</h1>

        {/* Controles */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Suscribirse */}
          <button
            onClick={() => setSuscrito(!suscrito)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm
              ${suscrito ? "bg-gray-200 text-black" : "bg-black text-white"}`}
          >
            <FaBell />
            {suscrito ? "Suscrito" : "Suscribirse"}
            <IoMdArrowDropdown />
          </button>

          {/* Me gusta y No me gusta */}
          <div className="flex items-center bg-gray-200 rounded-full overflow-hidden text-sm">
            <button
              onClick={() => {
                setLike(!like);
                if (dislike && !like) setDislike(false);
              }}
              className={`flex items-center gap-1 px-4 py-2 transition ${
                like ? "bg-black text-white" : "text-black"
              }`}
            >
              <FaThumbsUp />
              <span>377 k</span>
            </button>
            <button
              onClick={() => {
                setDislike(!dislike);
                if (like && !dislike) setLike(false);
              }}
              className={`px-4 py-2 transition ${
                dislike ? "bg-black text-white" : "text-black"
              }`}
            >
              <FaThumbsDown />
            </button>
          </div>
        </div>

        {/* Comentarios */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
          <textarea
            placeholder="Agrega un comentario..."
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring"
            rows={3}
          />
          <div className="text-right mt-2">
            <button className="bg-black text-white px-4 py-1 rounded text-sm hover:bg-gray-800">
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




