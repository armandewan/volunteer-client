import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VolunteerEdit = () => {
  const data = useLoaderData();
  const [formData, setFormData] = useState(null);
  const [deadline, setDeadLine] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.put(
      `${import.meta.env.VITE_HOST}/volunteer/${data?._id}`,
      { ...formData, deadline }
    );
    if (result?.data?.modifiedCount > 0) {
      Swal.fire({
        title: "Update Volunteer Post!",
        text: "Your file has been updated.",
        icon: "success",
      });
      navigate('/manage-post')
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const { deadline, _id, ...rest } = data;
    setFormData(rest);
    setDeadLine(deadline);
  }, []);
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Thumbnail Link</span>
          </div>
          <input
            type="text"
            placeholder="Enter thumbnail link"
            className="input input-bordered w-full max-w-xs"
            name="thumbnail"
            onChange={handleChange}
            value={formData?.thumbnail}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Enter Title Here"
            className="input input-bordered w-full max-w-xs"
            name="title"
            onChange={handleChange}
            value={formData?.title}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered h-24"
            placeholder="Enter Description"
            onChange={handleChange}
            value={formData?.description}
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <input
            type="text"
            placeholder="Enter Post Category"
            className="input input-bordered w-full max-w-xs"
            name="category"
            onChange={handleChange}
            value={formData?.category}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Location</span>
          </div>
          <input
            type="text"
            placeholder="Enter Location"
            className="input input-bordered w-full max-w-xs"
            name="location"
            onChange={handleChange}
            value={formData?.location}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Number of Volunteer</span>
          </div>
          <input
            type="number"
            placeholder="volunteer need"
            className="input input-bordered w-full max-w-xs"
            name="volunteerNumber"
            onChange={handleChange}
            value={formData?.volunteerNumber}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Deadline</span>
          </div>
          <DatePicker
            className="input input-bordered w-full max-w-xs"
            selected={deadline}
            onChange={(date) => setDeadLine(date)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder={data?.name}
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder={data?.email}
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </label>
        <label className="form-control w-full max-w-xs my-2">
          <input type="submit" className="btn btn-info" value="Update" />
        </label>
      </form>
    </div>
  );
};

export default VolunteerEdit;
