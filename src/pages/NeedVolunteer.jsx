import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import GridComp from "../components/GridComp";
import TableComp from "../components/TableComp";

const NeedVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [inputData, setInputData] = useState("");
  const [display, setDisplay] = useState("grid");
  const handleSearch = async () => {
    if (!inputData) {
      toast.error("Please input something first");
    } else {
      const data = await axios.post(`${import.meta.env.VITE_HOST}/search`, {
        inputData,
      });
      setVolunteers(data.data);
    }
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/volunteers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setVolunteers(data));
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <label className="input input-bordered flex items-center gap-2 max-w-xs">
          <input
            onChange={(e) => setInputData(e.target.value)}
            value={inputData}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 cursor-pointer"
            onClick={handleSearch}
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="flex gap-2 h-12">
          <img
            className="cursor-pointer"
            width="40px"
            src="https://img.icons8.com/?size=48&id=i5awsrw7V2Qr&format=png"
            alt="grid"
            onClick={()=>setDisplay('grid')}
          />
          <img
            className="cursor-pointer"
            width="40px"
            src="https://img.icons8.com/?size=100&id=8113&format=png"
            alt="table"
            onClick={()=>setDisplay('table')}
          />
        </div>
      </div>
      {volunteers?.length > 0 ? (
        display === "grid" ? (
          <GridComp volunteers={volunteers} />
        ) : (
          <TableComp volunteers={volunteers} />
        )
      ) : (
        <p className="text-xl font-bold text-red-400">
          No Volunteer Requirements Data Found!
        </p>
      )}
    </div>
  );
};

export default NeedVolunteer;
