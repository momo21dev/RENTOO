import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import Cars from "./components/Cars";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import useUserStore from "./others/ZuStand";
import AddCar from "./components/AddCar";
import Confirmation from "./components/Confirmation";

export const supabase = createClient(
  "https://evzfqbruihjjlysizzxg.supabase.co",
  "sb_publishable_rUVUT0e63sqPiZ_sY7ydaA_oZBWQSYZ"
);

function App() {
  const setUser = useUserStore((state) => state.setUser);
  //fetch session//
  async function getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const userId = session.user.id;
      const { data: userData, error } = await supabase.from('users')
        .select('*')
        .eq('id', userId)
        .single()
      if (error) {
        console.log(error.message)
      } else {
        setUser(userData);
      }
    }
  }
  useEffect(() => {
    getSession()
  }, [])

  //routes//  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
