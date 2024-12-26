import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import Lottie from "lottie-react";
import loginImage from "../assets/photos/lottie-login-img.json";
import { Helmet } from "react-helmet";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { loginUser, user, error, googleLogin, loading } =
    useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user) {
      navigate(from, { replace: true });
    }
  }, [error, user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="hero bg-orange-400 flex flex-row-reverse justify-evenly">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Lottie animationData={loginImage}/>
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
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
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <h2 className="btn underline text-2xl " onClick={googleLogin}>
            Google
          </h2>

          <Link to="/registration">Registration</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
