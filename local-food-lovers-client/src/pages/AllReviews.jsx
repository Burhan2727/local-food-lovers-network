import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard/FoodCard";

const AllReviews = () => {
  const [foods, setFoods] = useState([]);
  console.log(foods);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false)
  useEffect(() => {
    fetch("http://localhost:3000/allReviews", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      });
  }, []);
  const handleSubmit = (e)=>{
    e.preventDefault()
    const searchText = e.target.search.value;
    setSearchLoading(true)
    fetch(`http://localhost:3000/search?search=${searchText}`)
    .then(res => res.json())
    .then(data => {
       setFoods(data)
       setSearchLoading(false)
    })
  }
//   if(loading){
//     return <span className="loading loading-dots loading-xl flex justify-center items-center"></span>
//   }
  return (
    <div>
      {/* search input start */}
      <form onSubmit={handleSubmit} className="flex justify-center m-5">
            <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" name="search" required placeholder="Search Food by food name" />
      </label>
      <button className="btn btn-primary">{searchLoading? "Searching...": "Search"}</button>
        </form>
      {/* search input end */}
      <div className="text-center text-2xl font-bold mt-10 mb-5">
        Our All <span className="text-violet-700">Delicious</span> Foods{" "}
        <span className="text-red-700">Reviews</span>
      </div>
      <div className="flex justify-center items-center">
        {loading && <span className="loading loading-dots loading-xl"></span>}
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
