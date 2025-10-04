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
    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOut = async () => {
    logOut();
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to={"/cars"}>
          <h1 className="text-2xl font-extrabold text-yellow-500 tracking-wide">
            RENTOO
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:shadow-lg transition duration-300">
              {user ? `${user.first_name}` : "Guest"}
            </div>
          </Link>

          <Link to={"/login"}>
            <button
              onClick={handleLogOut}
              className="bg-gradient-to-r from-red-700 to-black text-white font-semibold px-5 py-2 rounded-full shadow hover:shadow-lg transition duration-300"
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </nav>

      {/* Cars */}
      <div className="p-8">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
           Available Cars
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={car.image}
                alt={car.brand}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-500 text-sm mb-1">{car.year}</p>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {car.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="font-bold text-yellow-500 text-lg">
                    ${car.price_day}/day
                  </p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-lg shadow transition duration-300">
                    RENT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
