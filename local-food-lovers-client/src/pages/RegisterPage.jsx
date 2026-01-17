import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

const RegisterPage = () => {
    const {createUser, updateProfileUser, setLoading, loading} = use(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const displayName = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passUpperLower = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
        if(password.length < 6){
            toast.error("password must be 6 characters!")
            return
        }
        if(!passUpperLower.test(password)){
            toast.error("password must have atleast one charecter Uppercase and  atleast one charecter Lowercase!")
            return
        }
        createUser(email, password)
        .then(result => {
            console.log(result.user)
            updateProfileUser(displayName, photoURL)
            .then(()=> {
                setLoading(false)
                toast.success("Registration and login Successful!")
                navigate("/")
            })
            .catch(error => {
                toast.error(error.message)
            })
        })
        .catch(error =>{
            console.log(error.code)
            if(error.code === "auth/email-already-in-use"){
                toast.error("You already registerd!please login")
            }
        })
        
    }
    return (
        <div className="flex h-screen justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl font-bold text-center">Registration now!</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                {/* name */}
              <label className="label">Name</label>
              <input type="text" name='name' className="input" placeholder="Email" />
                {/* email */}
              <label className="label">Email</label>
              <input type="email" name='email' className="input" placeholder="Email" />
                {/* photo url */}
              <label className="label">PhotoURL</label>
              <input type="text" name='photoURL' className="input" placeholder="PhotoURL" />
              {/* password */}
              <label className="label">Password</label>
              <input type="password" name='password' className="input" placeholder="Password" />
              {/* confirm password */}
              <label className="label">Confirm Password</label>
              <input type="password" name='confirm-password' className="input" placeholder="confirm Password" />
              <button className="btn btn-neutral mt-4">Sign up</button>
            </fieldset>
          </form>
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p>Already Registerd ! Please <Link to={"/login"} className='text-blue-600 hover:underline'>Login</Link></p>
        </div>
      </div>
    </div>
    );
};

export default RegisterPage;