"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

const API_KEY = "AIzaSyDqwptifs1jMRD4Q9dj0mjzKUPshUW7-kw";

const formatNumber = (num) => {
  const n = Number(num);
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return n;
};

export default function VerVideoYouTube() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [comentariosLocales, setComentariosLocales] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchVideoInfo = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setVideo(data.items[0]);
        }
      } catch (error) {
        console.error("Error al obtener datos del video:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${API_KEY}&maxResults=5`
        );
        const data = await res.json();
        if (data.items) {
          setComments(data.items);
        }
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchVideoInfo();
    fetchComments();
  }, [id]);

  if (!video) {
    return (
      <div className="ml-20 p-6">
        <p className="text-gray-500">Cargando video de YouTube...</p>
      </div>
    );
  }

  const { snippet, statistics } = video;
  const { title, description, channelTitle, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics || {};

  const descripcionReducida = description
    .split("\n")
    .slice(0, 2)
    .join("\n");

  const handleEnviarComentario = () => {
    if (nuevoComentario.trim() !== "") {
      setComentariosLocales((prev) => [
        ...prev,
        {
          autor: "Tú",
          texto: nuevoComentario,
        },
      ]);
      setNuevoComentario("");
    }
  };

  return (
    <div className="ml-20 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Reproductor */}
        <div className="relative pb-[56.25%] mb-4">
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className="absolute w-full h-full rounded-lg"
          />
        </div>

        {/* Info del video */}
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2 items-center">
          <p className="font-semibold">{channelTitle}</p>
          <p>{formatNumber(viewCount)} vistas</p>
          <p>{new Date(publishedAt).toLocaleDateString()}</p>
        </div>

        {/* Botones Suscribirse / Like / Dislike */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <button
            onClick={() => setSubscribed(!subscribed)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
              subscribed
                ? "bg-gray-300 text-black hover:bg-gray-400"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {subscribed ? "Suscrito" : "Suscribirse"}
          </button>

          <div className="flex gap-3 mt-2 sm:mt-0">
            <button
              onClick={() => {
                setLike(!like);
                if (dislike) setDislike(false);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              {like ? <AiFillLike className="text-black" /> : <AiOutlineLike />}
              <span>{formatNumber(likeCount || 0)}</span>
            </button>

            <button
              onClick={() => {
                setDislike(!dislike);
                if (like) setLike(false);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              {dislike ? (
                <AiFillDislike className="text-black" />
              ) : (
                <AiOutlineDislike />
              )}
            </button>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {descripcionReducida}
          </p>
        </div>

        {/* Comentarios */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Comentarios</h2>

          {/* Caja para comentar */}
          <div className="mb-4">
            <textarea
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe un comentario..."
              className="w-full p-2 border rounded resize-none"
              rows={3}
            />
            <button
              onClick={handleEnviarComentario}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enviar
            </button>
          </div>

          {/* Comentarios simulados */}
          {comentariosLocales.map((c, index) => (
            <div key={`local-${index}`} className="mb-4 border-b pb-2">
              <p className="font-bold">{c.autor}</p>
              <p className="text-sm">{c.texto}</p>
            </div>
          ))}

          {/* Comentarios reales */}
          {comments.map((c) => {
            const topLevelComment = c.snippet.topLevelComment.snippet;
            return (
              <div key={c.id} className="mb-4 border-b pb-2">
                <p className="font-bold">{topLevelComment.authorDisplayName}</p>
                <p className="text-sm">{topLevelComment.textDisplay}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


