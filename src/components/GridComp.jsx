import React from 'react';
import { Link } from 'react-router-dom';

const GridComp = ({volunteers}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
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
                <p>Author: <span className="font-bold">{volunteer?.name}</span></p>
                <p>
                  {volunteer?.description?.length > 80
                    ? volunteer?.description?.slice(0, 80)
                    : volunteer?.description}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/volunteers/${volunteer?._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
    );
};

export default GridComp;