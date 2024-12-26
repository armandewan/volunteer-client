import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BeAVolunteerModal = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const suggestion = e.target.suggestion.value;
    const newData = {
      name: user?.displayName,
      thumbnail: data?.thumbnail,
      title: data?.title,
      email: user?.email,
      suggestion,
      request: "requested",
      volunteerPost: data?._id,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_HOST}/requestToJoin/${data?._id}`,
      newData
    );
    if (res.status === 200) {
      toast.success("Request to join successfully");
      navigate("/manage-request");
    }
  };
  return (
    <div>
      <input
        type="checkbox"
        id="to_be_volunteer_modal"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Thumbnail Link</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.thumbnail}
                readOnly
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.title}
                readOnly
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                name="description"
                className="textarea textarea-bordered h-24"
                defaultValue={data?.description}
                readOnly
              ></textarea>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.category}
                readOnly
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Location</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.location}
                readOnly
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Number of Volunteer</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                defaultValue={data?.volunteerNumber}
                readOnly
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Deadline</span>
              </div>
              <input type="text" defaultValue={data?.deadline} readOnly />
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
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Suggestion</span>
              </div>
              <input
                type="text"
                placeholder="Enter Your Suggestion"
                className="input input-bordered w-full max-w-xs"
                name="suggestion"
                required
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Status</span>
              </div>
              <input
                type="text"
                placeholder="Enter Your Suggestion"
                className="input input-bordered w-full max-w-xs"
                defaultValue="requested"
                readOnly
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <input disabled={data?.volunteerNumber===0} type="submit" className="btn btn-info" value={data?.volunteerNumber===0?'Not Able To Request': 'Request'}/>
            </label>
          </form>
          <div className="modal-action">
            <label htmlFor="to_be_volunteer_modal" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeAVolunteerModal;
