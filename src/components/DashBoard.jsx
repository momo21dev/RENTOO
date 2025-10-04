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
  CartesianGrid
} from "recharts";
import { supabase } from "../App";

export default function DashBoard() {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logOut);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fake data (replace later with real DB query)
    const fakeData = {
      totalRents: 12,
      monthlyRents: [
        { month: "Jan", count: 2 },
        { month: "Feb", count: 1 },
        { month: "Mar", count: 3 },
        { month: "Apr", count: 2 },
        { month: "May", count: 4 },
      ],
    };
    setStats(fakeData);
  }, []);

  const handleLogOut = async () => {
    logOut();
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Dashboard
          </h1>
          <Link to={'/login'}>
            <button
              onClick={handleLogOut}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              LOGOUT
            </button>
          </Link>

        </div>

        {user ? (
          <div className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                <span className="block text-gray-500 text-sm font-medium">Name</span>
                <span className="text-gray-800 font-semibold">
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                <span className="block text-gray-500 text-sm font-medium">Email</span>
                <span className="text-gray-800 font-semibold">{user.email}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                <span className="block text-gray-500 text-sm font-medium">Role</span>
                <span className="text-gray-800 font-semibold">{user.role}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                <span className="block text-gray-500 text-sm font-medium">Total Rents</span>
                <span className="text-yellow-500 font-bold text-lg">{stats?.totalRents ?? 0}</span>
              </div>
            </div>

            {/* Rental Statistics */}
            {stats && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Rental Statistics
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.monthlyRents}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#374151" />
                      <YAxis stroke="#374151" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
                      />
                      <Bar dataKey="count" fill="#fbbf24" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user data...</p>
        )}

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <Link
            to="/cars"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg shadow-md transition"
          >
            Browse Cars
          </Link>
        </div>
      </div>
    </div>
  );
}
