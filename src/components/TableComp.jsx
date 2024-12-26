import React from "react";
import { Link } from "react-router-dom";

const TableComp = ({ volunteers }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-orange-800 text-xl font-bold text-black">
            <th>Title</th>
            <th>Author</th>
            <th>Deadline</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {volunteers?.map((volunteer, index) => (
            <tr key={volunteer?._id} className={`${index%2===0?'bg-orange-400': 'bg-gray-300'}`}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={volunteer?.thumbnail} alt={volunteer?.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      <Link to={`/volunteers/${volunteer?._id}`}>
                        {volunteer?.title}
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
              <td>{volunteer?.name}</td>
              <td>{new Date(volunteer?.deadline).toDateString()}</td>
              <th>
                <Link
                  className="btn btn-info btn-sm"
                  to={`/volunteers/${volunteer?._id}`}
                >
                  See Details
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComp;
