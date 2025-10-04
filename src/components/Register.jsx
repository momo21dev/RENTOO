import { Link, useNavigate } from "react-router";
import { supabase } from "../App";
import { useState } from "react";

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) {
      setError(error.message)
    }
    const user = data?.user
    if (user) {
      const { error } = await supabase.from('users')
        .insert([
          {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: 'USER'
          }
        ])
      if (error) {
        setError(error.message)
      } else {
        setSuccess('DONE')
        navigate('/login')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-600 to-black p-4">

      {/* Header */}
      <div className="mb-10 text-center">
        <Link to={'/'}>
          <h1 className="text-4xl font-extrabold text-yellow-600">RENTOO</h1>
        </Link>

        <p className="text-white mt-2">Create an account to start renting </p>
      </div>

      <form
        onSubmit={handleRegister}
        className="bg-black shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-white">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-white">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition shadow-md"
        >
          Register
        </button>

        {/* Login Button */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition shadow-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
}
