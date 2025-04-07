"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { database } from "./Firebase/config";
import useSearchStore from "@/store/SearchStore";

export default function VideosPublicos() {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useSearchStore(); // 

  useEffect(() => {
    const videosRef = ref(database, "publico/");
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const videosArray = Object.entries(data).map(([id, video]) => ({
          id,
          ...video,
        }));
        setVideos(videosArray);
      } else {
        setVideos([]);
      }
    });
  }, []);

  const videosFiltrados = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-72 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Videos recomendados</h1>

      {videosFiltrados.length === 0 ? (
        <p className="text-gray-500 mt-10 text-center">No se encontraron videos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosFiltrados.map((video) => (
            <Link
              key={video.id}
              href={`/ver/${video.id}`}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300"
            >
              <div className="relative pb-[56.25%]">
                <video
                  src={video.url}
                  className="absolute w-full h-full object-cover"
                  preload="metadata"
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm font-semibold line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Publicado el {new Date(video.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}






















