import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Loading from "../components/Loading";
import Lottie from "lottie-react";
import registrationImage from "../assets/photos/lottie-registration-img.json";

const Registration = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { registrationUser, user, googleLogin, error, loading } =
    useContext(AuthContext);
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    registrationUser(name, email, password, photo);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (user) {
      toast.success("Registration Successful!");
      navigate(from, { replace: true });
    }
  }, [error, user]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hero flex flex-row-reverse  rounded-lg bg-orange-400 
     justify-around ">
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <Lottie animationData={registrationImage}/>
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Registration!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegistration} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="url"
                name="photo"
                placeholder="photo url"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Registration</button>
            </div>
          </form>
          <h2 onClick={googleLogin} className="btn underline text-2xl ">
            Google
          </h2>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
