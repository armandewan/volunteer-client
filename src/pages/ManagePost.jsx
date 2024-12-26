import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

const ManagePost = () => {
  const { user } = useContext(AuthContext);
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `${import.meta.env.VITE_HOST}/volunteer/${id}`
        );
        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          const afterDeleteData = volunteers.filter((vol) => vol._id !== id);
          setVolunteers(afterDeleteData);
        }
      }
    });
  };
  useEffect(() => {
    setIsLoading(true);
    async function run() {
      const res = await axios.get(
        `${import.meta.env.VITE_HOST}/user/${user?.email}`
      );
      setVolunteers(res.data);
      setIsLoading(false);
    }
    run();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Helmet>
        <title>My Volunteer Need Posts</title>
      </Helmet>
      <h2 className="text-xl underline font-bold text-black my-2">
        My Volunteer Need Posts
      </h2>
      {volunteers?.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="table bg-orange-400">
            {/* head */}
            <thead>
              <tr className="bg-orange-800 text-xl font-bold text-black">
                <th>Title</th>
                <th>Position No</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers?.map((volunteer) => (
                <tr key={volunteer?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={volunteer?.thumbnail}
                            alt={volunteer?.title}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold"><Link to={`/volunteers/${volunteer?._id}`}>{volunteer?.title}</Link></div>
                      </div>
                    </div>
                  </td>
                  <td>{volunteer?.volunteerNumber}</td>
                  <td>{new Date(volunteer?.deadline).toDateString()}</td>
                  <th>
                    <Link
                      className="btn btn-info btn-xs"
                      to={`/volunteers/${volunteer?._id}/edit`}
                    >
                      Edit
                    </Link>{" "}
                    ||{" "}
                    <button
                      onClick={() => handleDelete(volunteer?._id)}
                      className="btn btn-primary btn-xs"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl font-bold text-red-400">
          No Volunteer Requirements Data Found!
        </p>
      )}
    </div>
  );
};

export default ManagePost;
