import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard/FoodCard';

const AllReviews = () => {
    const [foods, setFoods] = useState([])
      console.log(foods)
      const [loading, setLoading] = useState(true)
      useEffect(()=>{
        fetch("http://localhost:3000/allReviews", {
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
            <div className="text-center text-2xl font-bold mt-10 mb-5">Our All <span className="text-violet-700">Delicious</span> Foods <span className='text-red-700'>Reviews</span></div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
        </div>
    );
};

export default AllReviews;