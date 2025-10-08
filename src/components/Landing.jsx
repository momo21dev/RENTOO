import { Link } from "react-router";
import { supabase } from "../App";
import { useEffect, useState } from "react";

export default function Landing() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  async function fetchCars() {
    const { data, error } = await supabase.from("cars").select("*").limit(6);
    if (error) {
      console.log(error.message);
    } else {
      setCars(data);
      setSelectedCar(data[0]);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="mx-auto max-w-[1600px]">
      
      <header className="bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between m-6 lg:m-12 font-bold gap-4">
          <img
            src="https://car-rental-pcexwfwvp-devrahuls.vercel.app/static/media/logo.0ad964cb93ab30cc809d.png"
            alt=""
            width={"100px"}
          />
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-center">
            <h1 className="hover:text-[#FA4226] cursor-pointer">Home</h1>
            <h1 className="hover:text-[#FA4226] cursor-pointer">About</h1>
            <h1 className="hover:text-[#FA4226] cursor-pointer">Vehicle Models</h1>
            <h1 className="hover:text-[#FA4226] cursor-pointer">Testimonials</h1>
            <h1 className="hover:text-[#FA4226] cursor-pointer">Our Team</h1>
          </div>
          <div className="flex flex-col items-center sm:flex-row gap-3">
            <Link to={"/login"} className="hover:text-[#FA4226] text-center">
              SIGN IN
            </Link>
            <Link to={"/register"}>
              <button className="bg-[#FA4226] px-6 py-3 text-white rounded cursor-pointer w-full sm:w-auto">
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>

      
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center m-6 lg:m-12">
        <div className="flex flex-col justify-start gap-4 text-center lg:text-left lg:m-16">
          <h3 className="font-extrabold text-2xl">Plan your trip now</h3>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Save <span className="text-[#FA4226]">Big</span> with our
          </h1>
          <h1 className="text-4xl md:text-5xl font-extrabold">Car rental.</h1>
          <p className="text-gray-400">
            Rent the car of your dreams. Unbeatable prices, unlimited miles,
            flexible pick-up options and much more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to={'/login'}>
             <button className="p-4 bg-[#FA4226] text-white rounded text-xl font-bold border-2">
              Book Ride
            </button>
            </Link>
           
            <button className="bg-black text-white p-4 text-xl rounded font-bold hover:bg-white hover:text-black hover:border-2 hover:border-black cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://car-rental-pcexwfwvp-devrahuls.vercel.app/static/media/main-car.9b30faa59387879fa060.png"
            className="w-[90%] md:w-[700px] lg:w-[1000px]"
          />
        </div>
      </div>

      
      <div className="flex flex-col justify-center text-center gap-6 p-6">
        <h1 className="font-bold text-3xl">Plan your trip now</h1>
        <h1 className="font-extrabold text-5xl">Quick & easy car rental</h1>
        <div className="flex flex-col md:flex-row justify-around p-6 md:p-12 gap-10">
          {[
            {
              img: "/selectCar.png",
              title: "Select Car",
              desc: "We offer a big range of vehicles for all your driving needs.",
            },
            {
              img: "/contactOperator.png",
              title: "Contact Operator",
              desc: "Our friendly operators are always ready to help.",
            },
            {
              img: "/letsDrive.png",
              title: "Let's Drive",
              desc: "Whether you're hitting the open road, we’ve got you covered.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center max-w-[300px] gap-4 mx-auto"
            >
              <img src={item.img} alt="" className="w-[80px]" />
              <h1 className="font-bold text-2xl">{item.title}</h1>
              <p className="text-gray-400 text-sm md:text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex flex-col gap-3 mt-20 text-center px-6">
        <h1 className="text-2xl font-bold">Vehicle Models</h1>
        <h1 className="text-4xl md:text-5xl font-bold">Our rental fleet</h1>
        <p className="text-gray-500">
          Choose from a variety of our amazing vehicles to rent for your next{" "}
          <span>adventure or business trip</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 mt-8 px-6">
        <div className="flex flex-col gap-2 w-full lg:w-[300px]">
          {cars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car)}
              className={`p-4 text-start cursor-pointer rounded-md transition-all 
                ${
                  selectedCar?.id === car.id
                    ? "bg-[#FA4226] text-white"
                    : "hover:bg-[#FA4226] hover:text-white"
                }`}
            >
              <h1 className="text-lg font-bold">
                {car.brand} {car.model}
              </h1>
            </div>
          ))}
        </div>

        <img
          src={selectedCar?.image}
          alt=""
          className="rounded-3xl w-[90%] md:w-[600px]"
        />

        <div className="flex flex-col border-1 p-4 gap-4 text-center w-full md:w-[300px]">
          <h1 className="text-lg font-bold text-white bg-[#FA4226] p-2 rounded">
            Price Per Day : ${selectedCar?.price_day}
          </h1>
          <h1 className="text-lg font-bold border p-1">
            Brand | {selectedCar?.brand}
          </h1>
          <h1 className="text-lg font-bold border p-1">
            Model | {selectedCar?.model}
          </h1>
          <h1 className="text-lg font-bold border p-1">
            Year | {selectedCar?.year}
          </h1>
        </div>
      </div>

     
      <div className="flex flex-col text-center justify-center bg-[#2D2D2D] mt-20 p-10 md:p-16 gap-6">
        <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl">
          Save big with our cheap car rental!
        </h1>
        <h1 className="text-white text-lg md:text-2xl">
          Top Airports. Local Suppliers.{" "}
          <span className="text-[#FA4226]">24/7</span> Support.
        </h1>
      </div>
    </div>
  );
}
