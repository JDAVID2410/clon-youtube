"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { database } from "./Firebase/config";
import useSearchStore from "@/store/SearchStore";

const API_KEY = "AIzaSyDqwptifs1jMRD4Q9dj0mjzKUPshUW7-kw"; 

export default function VideosPublicos() {
  const [videosFirebase, setVideosFirebase] = useState([]);
  const [videosYoutube, setVideosYoutube] = useState([]);
  const { searchTerm } = useSearchStore();

  // Obtener videos desde Firebase ("publico")
  useEffect(() => {
    const videosRef = ref(database, "publico/");
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const videosArray = Object.entries(data).map(([id, video]) => ({
          id,
          ...video,
          fuente: "firebase",
        }));
        setVideosFirebase(videosArray);
      } else {
        setVideosFirebase([]);
      }
    });
  }, []);

  // Obtener videos desde la API de YouTube
  useEffect(() => {
    const buscarYoutube = async () => {
      try {
        // Se usa el searchTerm del store; si está vacío se usa un valor por defecto
        const query = searchTerm || "nextjs tutorial";
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
            query
          )}&key=${API_KEY}`
        );
        const data = await res.json();
        console.log("YouTube API:", data);
        const videos = data.items?.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          fuente: "youtube",
        })) || [];
        setVideosYoutube(videos);
      } catch (error) {
        console.error("Error al traer videos de YouTube:", error);
      }
    };

    buscarYoutube();
  }, [searchTerm]);

  // Combinar videos de ambas fuentes y filtrar según searchTerm 
  const todosLosVideos = [...videosFirebase, ...videosYoutube].filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-72 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Videos recomendados</h1>

      {todosLosVideos.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">No se encontraron videos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {todosLosVideos.map((video) => (
            <Link
              key={video.id}
              // Para videos de Firebase redirige a /ver/[id]; para YouTube a /ver/yt/[id]
              href={
                video.fuente === "firebase"
                  ? `/ver/${video.id}`
                  : `/ver/yt/${video.id}`
              }
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300"
            >
              <div className="relative pb-[56.25%]">
                {video.fuente === "firebase" ? (
                  <video
                    src={video.url}
                    className="absolute w-full h-full object-cover"
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-sm font-semibold line-clamp-2">{video.title}</h2>
                {video.fuente === "firebase" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Publicado el {new Date(video.created_at).toLocaleDateString()}
                  </p>
                )}
                {video.fuente === "youtube" && (
                  <p className="text-xs text-gray-500 mt-1">Fuente: YouTube</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}






















