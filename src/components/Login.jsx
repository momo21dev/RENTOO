import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useUserStore from "../others/ZuStand";
import { supabase } from "../App";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        } else if (data.session) {
            const userId = data.session.user.id;

            const { data: userData, error: fetchError } = await supabase
                .from("users")
                .select("*")
                .eq("id", userId)
                .single();
            console.log(data)
            if (fetchError) {
                setError(fetchError.message);
            } else {
                console.log(userData)
                setUser(userData);

                setSuccess("DONE");
                console.log("Logged in user:", userData);
                console.log()
                navigate("/dashboard");
            }
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 to-black p-4">


            <div className="mb-10 text-center">
                <Link to={'/'}>
                    <h1 className="text-4xl font-extrabold text-yellow-600">RENTOO</h1>
                </Link>

                <p className="text-white mt-2">Login to manage your cars & rentals</p>
            </div>


            <form
                onSubmit={handleLogin}
                className="bg-black shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                <div className="mb-4">
                    <label className="block mb-2 font-semibold text-white">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-4 py-3 rounded-lg  bg-gray-50"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold text-white">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-4 py-3 rounded-lg  bg-gray-50"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition shadow-md"
                >
                    Login
                </button>


                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition shadow-sm"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
