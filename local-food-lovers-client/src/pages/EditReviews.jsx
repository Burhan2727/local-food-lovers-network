import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const EditReviews = () => {
    const {id} = useParams();
    const [review, setReview] = useState()
    console.log(id)
    useEffect(()=>{
        fetch(`https://local-food-lovers-server-ecru.vercel.app/my-review/${id}`)
        .then(res => res.json())
        .then(data => {
            setReview(data)
        })
    }, [])
    const { user } = use(AuthContext);
      const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
          foodName: e.target.foodName.value,
          photo: e.target.foodImage.value,
          restaurantName: e.target.resturantName.value,
          restaurantLocation: e.target.location.value,
          rating: Number(e.target.rating.value),
          description: e.target.reviewText.value,
          reviewerName: user.email,
          created_at: new Date().toLocaleDateString("en-GB"),
        };
        fetch(`https://local-food-lovers-server-ecru.vercel.app/my-review/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("successfully updated review");
            console.log(data);
          });
      };
    return (
        <div>
            <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
        <div className="card-body p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Reviews</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="label font-medium">Food Name</label>
              <input
              defaultValue={review?.foodName}
                type="text"
                name="foodName"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter Food Name"
              />
            </div>
            {/* Food img URL */}
            <div>
              <label className="label font-medium">Food Image URL</label>
              <input
              defaultValue={review?.photo}
                type="url"
                name="foodImage"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {/* Resturant Name Field */}
            <div>
              <label className="label font-medium">Restaurant Name</label>
              <input
              defaultValue={review?.restaurantName}
                type="text"
                name="resturantName"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter Resturant Name"
              />
            </div>
            {/* Location Field */}
            <div>
              <label className="label font-medium">Location</label>
              <input
              defaultValue={review?.restaurantLocation}
                type="text"
                name="location"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter Resturant Location"
              />
            </div>
            {/* star rating Field */}
            <div>
              <label className="label font-medium">Star Rating</label>
              <input
              defaultValue={review?.rating}
                type="text"
                name="rating"
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Enter star rating"
              />
            </div>
            {/* Review Text Textarea */}
            <div>
              <label className="label font-medium">Review Text</label>
              <textarea
              defaultValue={review?.description}
                name="reviewText"
                required
                rows="3"
                className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
                placeholder="Enter your openion with this food"
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
            >
              Add Review
            </button>
          </form>
        </div>
      </div>
        </div>
    );
};

export default EditReviews;