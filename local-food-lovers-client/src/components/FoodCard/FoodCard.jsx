import React, { use } from 'react';
import { Link, useNavigate } from 'react-router';
import { GoHeartFill } from "react-icons/go";
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
const FoodCard = ({food}) => {
    const {foodName, photo, rating, restaurantLocation, restaurantName, reviewerName, _id} = food
    const navigate = useNavigate()
    const {user} = use(AuthContext)
    const handleFavourite = ()=>{
        const newData = {
              foodName: foodName,
              photo: photo,
              restaurantName: restaurantName,
              restaurantLocation: restaurantLocation,
              reviewerName: user?.email,
              created_at: new Date().toLocaleDateString("en-GB"),
            };
            if(user?.email){
                fetch("http://localhost:3000/my-favourites", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newData),
            })
              .then((res) => res.json())
              .then((data) => {
                toast.success("successfully added your Favourite");
                console.log(data);
              });
            }else{
                navigate("/login")
            }
          };
          const handleViewDetails = ()=>{
            
          }
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={photo}
          alt={foodName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <div className='flex justify-between items-center'>
            <h2 className="card-title">{foodName}</h2>
            <button onClick={handleFavourite} className='cursor-pointer'><GoHeartFill size={20} color='red'/></button>
        </div>
        <div className="badge text-xs badge-xs badge-secondary rounded-full">{rating}</div>
        <div className="text-xs text-secondary">{reviewerName}</div>
        <p className="line-clamp-1">
            {restaurantName}
        </p>
        {/* <p className="text-sm text-base-content/70">by {author}</p> */}
        <div className="card-actions justify-between items-center mt-4">
          <Link to={`/food-details/${_id}`} className="btn rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-sm">View Details</Link>
          <Link to={"/all-reviews"} className="btn rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-red-600 hover:to-pink-500 text-white w-full btn-sm">Show All Reviews</Link>
        </div>
      </div>
    </div>
    );
};

export default FoodCard;