import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="relative h-screen bg-[url('https://res.cloudinary.com/dr5cfk7qh/image/upload/v1759826003/915_geqy9e.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Drive your way with <span className="text-yellow-400">RENTOO</span>
        </h1>

        <p className="text-base sm:text-lg md:text-2xl mb-10">
          Fast • Simple • Reliable
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link to="/login">
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-black transition w-full sm:w-auto">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-yellow-400  border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-black transition w-full sm:w-auto">
              Register
            </button>
          </Link>

          
        </div>
      </div>
    </div>
  );
}
