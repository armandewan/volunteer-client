import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import webLogo from "../assets/photos/images.logo.png";
const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li><Link to='/need-volunteer'>Need Volunteer</Link></li>
      <li>
        <details>
          <summary>My Profile</summary>
          <ul className="p-2 bg-yellow-600">
            <li className=" hover:bg-red-900 hover:text-white rounded-lg"><Link to='/add-volunteer'>Add Volunteer need Post</Link></li>
            <li className=" hover:bg-red-900 hover:text-white rounded-lg"><Link to='/manage-post'>Manage My Posts </Link></li>
            <li><Link to='/manage-request'>My Requests </Link></li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <div className="navbar bg-yellow-600">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex gap-2 justify-evenly btn btn-ghost">
          <img className="w-8" src={webLogo}alt="" />
        <Link to='/' className=" text-xl">Safe Hands</Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex z-50">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={user?.photoURL} alt={user?.displayName}/>
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>{user.displayName}</li>
                <li>
                  <button onClick={logoutUser} className="btn btn-sm">
                    Logout
                  </button>
                </li>
              </ul>
            </div>{" "}

          </>
        ) : (
          <div>
            <Link className="btn hover:bg-sky-600 " to={"/login"}>
              Login
            </Link>
            <Link className="btn hover:bg-sky-600 " to={"/registration"}>
              Registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
