import { Link, useNavigate } from "react-router";
import { supabase } from "../App";
import { useState } from "react";

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    }

    const user = data?.user;
    if (user) {
      const { error } = await supabase.from("users").insert([
        {
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          role: "USER",
        },
      ]);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("DONE");
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="mb-10 text-center">
        <Link to={"/"}>
          <h1 className="text-4xl font-extrabold text-black">RENTOO</h1>
        </Link>
        <p className="text-gray-600 mt-2">Create an account to start renting</p>
      </div>

      
      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 w-full max-w-6xl">
       
        <div className="w-full lg:w-1/2 flex justify-center">
          <form
            onSubmit={handleRegister}
            className="bg-white shadow-2xl rounded-2xl p-8 sm:p-12 w-full max-w-md border border-gray-100"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-black">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-black">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border text-black"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold text-black">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-200 hover:bg-[#FA4226] hover:text-white text-black font-semibold py-3 rounded-lg transition shadow-md"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full mt-4 bg-gray-200 hover:bg-[#FA4226] hover:text-white text-black font-semibold py-3 rounded-lg transition shadow-sm"
            >
              Login
            </button>
          </form>
        </div>

       
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://car-rental-pcexwfwvp-devrahuls.vercel.app/static/media/main-car.9b30faa59387879fa060.png"
            alt="main car"
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px]"
          />
        </div>
      </div>
    </div>
  );
}
