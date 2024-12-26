import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BeAVolunteerModal from "../components/BeAVolunteerModal";
import { Helmet } from "react-helmet";

const NeedVolunteerById = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const data = useLoaderData();
  const {
    thumbnail,
    title,
    description,
    name,
    email,
    deadline,
    category,
    location,
    volunteerNumber,
  } = data;
  return (
    <div className="flex flex-col items-center my-2">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} />
      <h2 className="text-xl">{title}</h2>
      <p>Organization Name: {name}</p>
      <p>Organization Email: {email}</p>
      <p>Category: {category}</p>
      <p>Location: {location}</p>
      <p>No of Volunteer need: {volunteerNumber}</p>
      <p>Deadline: {new Date(deadline).toDateString()}</p>
      <p>{description}</p>
      <label
        onClick={() => setModalOpen(true)}
        htmlFor="to_be_volunteer_modal"
        className="btn btn-info"
      >
        Be A Volunteer
      </label>
      {modalOpen && <BeAVolunteerModal data={data} />}
    </div>
  );
};

export default NeedVolunteerById;
