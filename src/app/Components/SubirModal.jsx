'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Play } from 'lucide-react';

export default function SubirModal({ onClose }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleGoToPerfil = () => {
    router.push('/perfil');
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-24 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5" /> Subir video
        </h2>
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Seleccionar archivo
        </button>
        {videoUrl && (
          <div className="mt-4">
            <video src={videoUrl} controls className="w-full rounded-lg" />
            <button
              onClick={handleGoToPerfil}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Ir a Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


