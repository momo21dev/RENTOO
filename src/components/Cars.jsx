import { useEffect, useState } from "react";
import { supabase } from "../App";
import useUserStore from "../others/ZuStand";
import { Link } from "react-router";

export default function Cars() {
  const [data, setData] = useState([]);
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);

  const fetchData = async () => {
    const { data, error } = await supabase.from("cars").select("*");
    if (error) console.log(error);
    else setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOut = async () => {
    logOut();
    await supabase.auth.signOut();
  };

  const deleteCar = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("cars").delete().eq("id", id);

    if (error) {
      alert("Error deleting car: " + error.message);
    } else {
      alert("Car deleted successfully!");
      setData((prev) => prev.filter((car) => car.id !== id));
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col">
      
      <nav className="bg-black/90 backdrop-blur-md shadow-md px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
        <Link to={"/cars"}>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            RENTOO
          </h1>
        </Link>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-0">
          <Link to="/dashboard">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow hover:shadow-lg hover:scale-105 transition duration-300">
              {user ? `${user.first_name}` : "Guest"}
            </div>
          </Link>

          {isAdmin && (
            <Link to={"/addcar"}>
              <button className="bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow hover:scale-105 transition duration-300">
                ADD CAR
              </button>
            </Link>
          )}

          <Link to={"/login"}>
            <button
              onClick={handleLogOut}
              className="bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow hover:scale-105 transition duration-300"
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </nav>

      
      <div className="flex-grow p-4 sm:p-8">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-white drop-shadow-lg">
           Available Cars 
        </h2>

       
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((car) => (
            <div
              key={car.id}
              className="bg-gradient-to-b from-gray-800 to-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.brand}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                  {car.year}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-white mb-1">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-300 text-sm mb-3 flex-grow line-clamp-3">
                  {car.description}
                </p>

                <div className="flex items-center justify-between gap-2 mt-auto">
                  <p className="font-bold text-white text-lg">
                    ${car.price_day}/day
                  </p>

                  <div className="flex gap-2">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-300">
                      RENT
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-300"
                      >
                        DELETE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {data.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-lg">
            No cars available at the moment 
          </p>
        )}
      </div>
    </div>
  );
}
