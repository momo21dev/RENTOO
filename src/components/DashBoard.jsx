import { useEffect, useState } from "react";
import useUserStore from "../others/ZuStand";
import { Link, useNavigate } from "react-router";
import { supabase } from "../App";

export default function DashBoard() {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    logOut();
    navigate("/login");
  };

  async function fetchRentals() {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("rentals")
      .select(`
        id,
        start_date,
        end_date,
        total_price,
        cars (
          id,
          brand,
          model,
          year,
          price_day,
          image,
          description
        )
      `)
      .eq("user_id", user.id)
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching rentals:", error.message);
    } else {
      setRentals(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRentals();
  }, [user]);

  return (
    <div className="min-h-screen  bg-white flex-col">
     
      <nav className="bg-white backdrop-blur-md shadow-md px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
        <Link to={"/cars"}>
          <h1 className="text-3xl font-extrabold text-black tracking-wide">
            RENTOO
          </h1>
        </Link>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-0">
          <div className="bg-[#FA4226] text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow hover:shadow-lg hover:scale-105 transition duration-300">
            {user ? `${user.firstName}` : "Guest"}
          </div>

          <Link to={"/login"}>
            <button
              onClick={handleLogOut}
              className="bg-red-700 text-white font-semibold px-4 sm:px-5 py-2 rounded-full shadow hover:scale-105 transition duration-300"
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </nav>

      
      <div className="bg-[#FA4226] shadow-lg rounded-2xl p-8 max-w-lg mx-auto mt-10 text-center text-white">
        <h1 className="text-3xl font-extrabold mb-2">
          Welcome, {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-white mb-1">{user?.email}</p>
        <p className="text-black font-semibold">
          Role:{" "}
          <span className="text-black">{user?.role || "User"}</span>
        </p>
      </div>

      
      <div className="flex-grow p-4 sm:p-8">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-black drop-shadow-lg">
          Your Rentals
        </h2>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : rentals.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven't rented any cars yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {rentals.map((rental) => (
              <div
                key={rental.id}
                className=" bg-[#FA4226] rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className="relative">
                  <img
                    src={
                      rental.cars?.image ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={rental.cars?.model}
                    className="w-full h-52 object-cover "
                  />
                  <span className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                    {rental.cars?.year}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow text-black">
                  <h2 className="text-xl font-bold mb-1">
                    {rental.cars?.brand} {rental.cars?.model}
                  </h2>
                  

                  <div className="mt-auto">
                    <p className="font-bold text-black text-lg mb-1">
                      {rental.cars?.price_day} EGP/day
                    </p>
                    <p className="text-white text-sm">
                      <strong>Total:</strong> {rental.total_price} EGP
                    </p>
                    <p className="text-white text-sm mt-2">
                      {rental.start_date} → {rental.end_date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/cars"
            className="hover:bg-[#FA4226] bg-black text-white font-bold px-6 py-3 rounded-full shadow hover:scale-105 transition duration-300"
          >
            + Rent New Car
          </Link>
        </div>
      </div>
    </div>
  );
}
