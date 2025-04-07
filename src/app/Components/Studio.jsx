export default function Studio() {
    return (
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r p-4">
          <div className="font-bold text-xl mb-6 text-[#cc0000]">Studio</div>
          <ul className="space-y-4 text-gray-700">
            <li className="font-semibold">Panel</li>
            <li className="bg-gray-200 rounded px-2 py-1">Contenido</li>
            <li>Analytics</li>
            <li>Comunidad</li>
            <li>Subtítulos</li>
            <li>Configuración</li>
          </ul>
        </aside>
  
        {/* Contenido del menu */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">Contenido del canal</h2>
          <div className="border rounded-lg p-4 bg-white shadow">
            <p>📽️ 5384345 uhd 3840 2160 25fps</p>
            <span className="text-sm text-gray-500">Agrega una descripción</span>
          </div>
        </main>
      </div>
    );
  }
  