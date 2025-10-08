import { useState } from "react";
import { supabase } from "../App";
import { Link, useNavigate } from "react-router";

export default function AddCar() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()

    const handleAddCar = async (e) => {
        e.preventDefault();
        setError("");
        if (!brand || !model || !year || !price || !description || !image) {
            setError("Please fill all fields");
            return;
        }

        const { error } = await supabase.from("cars").insert([
            {
                brand,
                model,
                year,
                price_day: price,
                description,
                image,
            },
        ]);

        if (error) {
            setError(error.message);
        } else {
            setSuccess("✅ Car added successfully!");
            setBrand("");
            setModel("");
            setYear("");
            setPrice("");
            setDescription("");
            setImage("");
            navigate('/cars')
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">

            <nav className="bg-white backdrop-blur-md shadow-md px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center w-full sticky top-0 z-50">
                <Link to={"/cars"}>
                    <h1 className="text-3xl font-extrabold text-black tracking-wide">
                        RENTOO
                    </h1>
                </Link>
            </nav>


            <div className="w-full max-w-lg mt-10 p-8 bg-[#FA4226] rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Add New Car
                </h2>

                <form
                    onSubmit={handleAddCar}
                    className="flex flex-col gap-5 text-white"
                >
                    <input
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg "
                    />

                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg "
                    />

                    <input
                        type="number"
                        placeholder="Price per day"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg "
                    />

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg "
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-white text-black p-3 rounded-lg h-24 "
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-black text-white font-bold py-3 rounded-2xl hover:bg-white hover:text-gray-700 shadow hover:scale-105 transition duration-300"
                    >
                        Add Car
                    </button>

                    {error && (
                        <p className="text-red-400 text-center font-medium mt-2">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-400 text-center font-medium mt-2">
                            {success}
                        </p>
                    )}
                </form>
            </div>


            <div className="mt-8 mb-10">
                <Link
                    to="/cars"
                    className="bg-black hover:bg-[#FA4226] text-white font-semibold py-3 px-8 rounded-full shadow hover:scale-105 transition duration-300"
                >
                    Back to Cars
                </Link>
            </div>
        </div>
    );
}
