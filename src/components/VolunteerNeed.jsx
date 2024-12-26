import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VolunteerNeed = () => {
  const [volunteers, setVolunteers] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await axios.get(
        `${import.meta.env.VITE_HOST}/volunteersNeed`
      );
      setVolunteers(result.data);
    }
    getData();
  }, []);
  return (
    <section className="my-4 p-2">
      <h5 className="text-xl font-semibold text-center underline">
        Volunteer Needs Now{" "}
      </h5>
      {volunteers?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 my-2">
          {volunteers?.map((volunteer) => (
            <div
              key={volunteer?._id}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img src={volunteer?.thumbnail} alt={volunteer?.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{volunteer?.title}</h2>
                <p>
                  Category: <span className="font-bold">{volunteer?.category}</span>
                </p>
                <p>
                  Deadline: <span className="font-bold">{new Date(volunteer?.deadline).toDateString()}</span>
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/volunteers/${volunteer?._id}`}
                    className="btn bg-red-900 text-white hover:text-black mx-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl font-bold text-red-400">
          No Volunteer Requirements Data Found!
        </p>
      )}
      <Link className="btn btn-info w-4/12" to={'/need-volunteer'}>See All</Link>
    </section>
  );
};

export default VolunteerNeed;
