import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { VolunteerProvider } from "../context/VolunteerContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const form = e.target;
    const thumbnail = form.thumbnail.value;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteerNumber = form.volunteerNumber.value;
    const deadline = startDate;
    const data = {
      thumbnail,
      title,
      description,
      category,
      location,
      volunteerNumber,
      deadline,
      name: user?.displayName,
      email: user?.email,
    };
    const res = await axios.post(`${import.meta.env.VITE_HOST}/volunteer`, data);
    setIsLoading(false)
    if(res.status===201){
      toast.success('Volunteer Need Post Create Successfully!')
      navigate('/manage-post')
    }else{
      toast.error(res?.data?.message)
    }
    form.reset();
  };
  if(isLoading){
    return <Loading />
  }
  return (
    <div className="flex flex-col items-center">
    <Helmet>
      <title>Add Volunteer Need Post</title>
    </Helmet>
      <h1 className="text-xl underline">Add Volunteer Form</h1>
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
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Deadline</span>
          </div>
          <DatePicker
            className="input input-bordered w-full max-w-xs"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder={user?.displayName}
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
            placeholder={user?.email}
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </label>
        <label className="form-control w-full max-w-xs my-2">
          <input type="submit" className="btn btn-info" value="Submit" />
        </label>
      </form>
    </div>
  );
};

export default AddVolunteer;
