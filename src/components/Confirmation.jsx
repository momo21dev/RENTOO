import { useEffect, useState } from "react";
import { supabase } from "../App";
import useUserStore from "../others/ZuStand";
import useCarIdStore from "../others/CarId";

export default function Confirmation() {
  const { carId } = useCarIdStore();
  const user = useUserStore((state) => state.user);

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // 🟢 نجيب بيانات العربية المختارة
  useEffect(() => {
    const fetchCar = async () => {
      const { data, error } = await supabase.from("cars").select("*").eq("id", carId).single();
      if (error) console.log(error);
      else setCar(data);
    };
    if (carId) fetchCar();
  }, [carId]);

  // 🧮 نحسب السعر الكلي
  useEffect(() => {
    if (car && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) setTotalPrice(diffDays * car.price_day);
      else setTotalPrice(0);
    }
  }, [startDate, endDate, car]);

  // ✅ لما يضغط "Confirm Rent"
  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("من فضلك اختار تاريخ البداية والنهاية");
      return;
    }

    const { error } = await supabase.from("rentals").insert([
      {
        user_id: user.id,
        car_id: carId,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
      },
    ]);

    if (error) {
      console.log("Error inserting rental:", error);
      alert("❌ error while confirm the ");
    } else {
      alert("✅ confirmed");
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
         confirm car rental
        </h1>

        {car ? (
          <>
            <p className="text-gray-300 mb-2 text-center">
              <span className="font-bold text-white">{car.brand} {car.model}</span> ({car.year})
            </p>
            <p className="text-center text-blue-400 font-semibold mb-6">
              Daily Price ${car.price_day}
            </p>

            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">start date</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">end date</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {totalPrice > 0 && (
                <p className="text-center text-green-400 font-bold">
                  total price: ${totalPrice}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
              >
               confirm
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-400">جارِ تحميل بيانات العربية...</p>
        )}
      </div>
    </div>
  );
}
