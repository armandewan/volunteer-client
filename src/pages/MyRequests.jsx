import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const handleDelete =(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`${import.meta.env.VITE_HOST}/requests/${id}`)
        if(res.status===200){
          Swal.fire({
            title: "Canceled!",
            text: "Your request has been canceled.",
            icon: "success"
          });
          const afterDeleteData = requests.filter(req=>req._id !== id);
          setRequests(afterDeleteData)
        }
      }
    });
  }
  useEffect(() => {
    setIsLoading(true)
    async function requests() {
      const data = await axios.get(
        `${import.meta.env.VITE_HOST}/requests/${user?.email}`
      );
      setRequests(data?.data);
      setIsLoading(false)
    }
    requests();
  }, []);
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
    <Helmet>
      <title>My Volunteer Requests</title>
    </Helmet>
      <h2 className="text-xl underline font-bold text-black my-2">
        My Volunteer Requests
      </h2>
      {requests?.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="table bg-orange-400">
            {/* head */}
            <thead>
              <tr className="bg-orange-800 text-xl font-bold text-black">
                <th>Title</th>
                <th>Suggestion</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((volunteer) => (
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
                        <div className="font-bold">{volunteer?.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{volunteer?.suggestion}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(volunteer?._id)}
                      className="btn btn-primary btn-xs"
                    >
                      Cancel
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl font-bold text-red-400">
          No Request Data Found!
        </p>
      )}
    </div>
  );
};

export default MyRequests;
