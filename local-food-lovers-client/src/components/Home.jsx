import React, { useEffect, useState } from "react";
import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import FoodCard from "./FoodCard/FoodCard";
const Home = () => {
  const [foods, setFoods] = useState([])
  console.log(foods)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    fetch("https://local-food-lovers-server-ecru.vercel.app/allFoods", {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      setFoods(data)
      setLoading(false)
    })
  }, [])
  return (
    <div>
      <div className="flex justify-center items-center">
        {
          loading && <span className="loading loading-dots loading-xl"></span>
        }
      </div>
      {/* hero section start */}
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={food1} className="w-full h-90 object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={food2} className="w-full h-90 object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={food3} className="w-full h-90 object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      {/* hero section end */}
      {/* latest foods reviews */}
      <div className="text-center text-2xl font-bold mt-10 mb-5">Our <span className="text-violet-700">Delicious</span> Foods</div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
