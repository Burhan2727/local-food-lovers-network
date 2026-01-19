import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState();
  const [loading, setLoading] = useState(true);
  console.log(food);
  useEffect(() => {
    fetch(`http://localhost:3000/food-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
        <div className="flex justify-center">
            {loading && <span className="loading loading-dots loading-xl"></span>}
        </div>
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
            <div className="shrink-0 w-full md:w-1/2">
              <img
                src={food?.photo}
                alt=""
                className="w-full object-cover rounded-xl shadow-md"
              />
            </div>

            <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {food?.foodName}
              </h1>

              <div className="flex gap-3">
                <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                  {food?.restaurantName}
                </div>

                <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                  {food?.restaurantLocation}
                </div>
              </div>
            <p className="font-bold">{food.reviewerName}</p>
            <p className="font-bold">{food.created_at}</p>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {food?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
