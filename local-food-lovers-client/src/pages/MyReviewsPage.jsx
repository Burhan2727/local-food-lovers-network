import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";
const MyReviewsPage = () => {
  const { user } = use(AuthContext);
  const [myReviews, setmyReviews] = useState([]);
  console.log(myReviews);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-reviews?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setmyReviews(data);
        });
    }
  }, [user?.email]);
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/my-reviews/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
                const filterReviews = myReviews.filter(review => review._id !== _id)
                setmyReviews(filterReviews)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl">My Reviews</h1>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL NO:</th>
              <th>Food Name</th>
              <th>Restaurant Name</th>
              <th>Posted Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myReviews.map((myReview, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={myReview.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{myReview.foodName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {myReview.restaurantName}
                  </span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {myReview.restaurantLocation}
                  </span>
                </td>
                <td>{myReview.created_at}</td>
                <th>
                  <Link to={`/edit-review/${myReview._id}`} className="btn btn-primary btn-xs">Edit</Link>
                </th>
                <th>
                  <button onClick={()=> handleDelete(myReview._id)} className="btn btn-primary btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviewsPage;
