import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="relative h-screen bg-[url('https://res.cloudinary.com/dr5cfk7qh/image/upload/v1759076219/Drive_your_way_with_Rentoo_Fast_Simple_Reliable._wni06x.png')] bg-cover bg-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-white px-6 sm:px-12 md:px-24 lg:w-1/2">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Drive your way with <span className="text-yellow-400">,RENTOO</span>
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
            <button className="bg-transparent border-2 border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-black transition w-full sm:w-auto">
              Register
            </button>
          </Link>

          <button className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-black transition w-full sm:w-auto">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}
