export default function Bienvenida({ onContinuar }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <img src="/bienvenida.png" alt="Bienvenida" className="w-full max-w-xl mb-6 rounded-xl shadow-lg" />
        <h1 className="text-2xl font-bold mb-4">Te damos la bienvenida a YouTube Studio</h1>
        <button
          onClick={onContinuar}
          className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:opacity-80"
        >
          Continuar
        </button>
      </div>
    );
  }
  