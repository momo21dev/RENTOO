import { useEffect, useState } from "react";
import useUserStore from "../others/ZuStand";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { supabase } from "../App";

export default function DashBoard() {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);
  const [stats, setStats] = useState(null);

  const handleLogOut = async () => {
    logOut();
    await supabase.auth.signOut();
  };

  // 🧠 Fetch rentals for this user
  useEffect(() => {
    console.log(user)
    const fetchStats = async () => {
      if (!user || !user.id) {
        return;
      }

     

      const { data, error } = await supabase
        .from("rentals")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching rentals:", error.message);
        return;
      }

      // لو مفيش بيانات
      if (!data || data.length === 0) {
        setStats({ totalRents: 0, monthlyRents: [] });
        return;
      }

      const totalRents = data.length;

      const monthlyMap = {};
      data.forEach((rental) => {
        const date = new Date(rental.start_date);
        const month = date.toLocaleString("default", { month: "short" });
        monthlyMap[month] = (monthlyMap[month] || 0) + 1;
      });

      const monthlyRents = Object.entries(monthlyMap).map(([month, count]) => ({
        month,
        count,
      }));

      setStats({ totalRents, monthlyRents });
    };

    fetchStats();
  }, [user]);
 
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
              {user ? `${user.firstName}` : "Guest"}
            </div>
          </Link>

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

      <div className="flex-grow p-6 sm:p-10 text-white">
        <h2 className="text-4xl font-extrabold mb-10 text-center drop-shadow-lg">
          Dashboard Overview
        </h2>

        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
              <p className="text-gray-300 text-sm">Name</p>
              <p className="text-xl font-bold text-white mt-1">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
              <p className="text-gray-300 text-sm">Email</p>
              <p className="text-xl font-bold text-white mt-1 break-all">
                {user.email}
              </p>
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
              <p className="text-gray-300 text-sm">Role</p>
              <p className="text-xl font-bold text-white mt-1">{user.role}</p>
            </div>

            <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition duration-300">
              <p className="text-gray-300 text-sm">Total Rents</p>
              <p className="text-white text-2xl font-bold mt-1">
                {stats?.totalRents ?? 0}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading user data...</p>
        )}

        {!stats ? (
          <p className="text-center text-gray-400 mt-10">Loading stats...</p>
        ) : stats?.monthlyRents?.length > 0 ? (
          <div className="bg-gradient-to-b from-gray-800 to-gray-700 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Rental Statistics
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyRents}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                  <XAxis dataKey="month" stroke="#d1d5db" />
                  <YAxis stroke="#d1d5db" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      borderRadius: "8px",
                      color: "#fff",
                      border: "1px solid #374151",
                    }}
                  />
                  <Bar dataKey="count" fill="#ffffff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No rentals found yet.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/cars"
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold py-3 px-10 rounded-full shadow hover:scale-105 transition duration-300"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    </div>
  );
}
