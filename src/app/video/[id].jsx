"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

        {/* Info del video */}
        <h1 className="text-xl font-semibold mb-2">{video.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Botón de Suscribirse */}
          <button
            onClick={() => setSuscrito(!suscrito)}
            className={`px-4 py-2 rounded-full font-semibold transition text-sm
              ${suscrito ? "bg-gray-200 text-black flex items-center gap-2" : "bg-black text-white"}`}
          >
            {suscrito ? (
              <>
                <span className="material-icons">notifications</span> Suscrito
                <span className="material-icons text-xs">expand_more</span>
              </>
            ) : (
              "Suscribirse"
            )}
          </button>

          {/* Me gusta */}
          <button
            onClick={() => {
              setLike(!like);
              if (dislike && !like) setDislike(false);
            }}
            className={`px-3 py-2 rounded-full transition text-sm flex items-center gap-1 border
              ${like ? "bg-black text-white" : "bg-white text-black"}`}
          >
            <span className="material-icons">thumb_up</span> Me gusta
          </button>

          {/* No me gusta */}
          <button
            onClick={() => {
              setDislike(!dislike);
              if (like && !dislike) setLike(false);
            }}
            className={`px-3 py-2 rounded-full transition text-sm flex items-center gap-1 border
              ${dislike ? "bg-black text-white" : "bg-white text-black"}`}
          >
            <span className="material-icons">thumb_down</span> No me gusta
          </button>
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

