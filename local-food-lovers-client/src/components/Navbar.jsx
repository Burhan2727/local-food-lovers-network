import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import logoImg from "../assets/logo.jpg"
const Navbar = () => {
  const { user, signOutUser, setLoading } = use(AuthContext);
  console.log(user);
  const navigate = useNavigate()
  const handleLogin = ()=> {
    navigate("/login")
  }
  const links = (
    <>
      <li>
        <NavLink to={"/add-review"}>Add Review</NavLink>
      </li>
      <li>
        <NavLink to={"/my-review"}>My Reviews</NavLink>
      </li>
    </>
  );
  const handleSignOutUser = () => {
    signOutUser()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickLogo = ()=>{
    navigate("/")
  }
  return (
    <div className="navbar bg-base-100 shadow-sm md:px-15 lg:px-15">
        <div>
            <img onClick={handleClickLogo} className="w-15 object-cover" src={logoImg} alt="" />
        </div>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Locale Food Lovers Netwotk</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {/* dropdown start */}
        {
            user ? <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            {user?.photoURL ? (
              <img
                className="w-15 h-15 rounded-full object-cover cursor-pointer"
                src={user.photoURL}
                alt="photoURL"
              />
            ) : (
              <FaUserCircle size={45} />
            )}
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <Link to={"/add-review"}>
                Add Review
              </Link>
            </li>
            <li>
              <Link to={"/my-review"}>
                My Reviews
              </Link>
            </li>
            <li>
              {user ? (
                <button className="btn btn-primary mt-2" onClick={handleSignOutUser}>Log Out</button>
              ) : (
                <Link to={"/login"} className="btn btn-primary mt-2">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div> : <button onClick={handleLogin} className="btn btn-primary">Login</button>
            
        }
        {/* dropdown end */}
      </div>
    </div>
  );
};

export default Navbar;
