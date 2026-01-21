import React, { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const MyFavourite = () => {
    const { user } = use(AuthContext);
      const [myFavourites, setmyFavourites] = useState([]);
      useEffect(() => {
        if (user?.email) {
          fetch(`https://local-food-lovers-server-ecru.vercel.app/my-favourites?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              setmyFavourites(data);
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
            fetch(`https://local-food-lovers-server-ecru.vercel.app/my-favourites/${_id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount) {
                    const filterFavouites = myFavourites.filter(fav => fav._id !== _id)
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                  setmyFavourites(filterFavouites)
                }
              });
          }
        });
      };
    return (
        <div>
      <h1 className="text-3xl text-center m-5">My Favourites</h1>
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
            {myFavourites.map((myFavourite, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={myFavourite.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{myFavourite.foodName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {myFavourite.restaurantName}
                  </span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {myFavourite.restaurantLocation}
                  </span>
                </td>
                <td>{myFavourite.created_at && new Date(myFavourite.created_at).toLocaleDateString("en-GB")}</td>
                <th>
                  <button onClick={()=> handleDelete(myFavourite._id)} className="btn btn-primary btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default MyFavourite;