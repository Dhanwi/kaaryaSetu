import { useEffect, useContext, useState } from "react";
import { SetPopupContext } from "../../App";
import axios from "axios";
import apiList from "../../lib/apiList";
import { useNavigate } from "react-router-dom";
import PropType from "prop-types";
import HaveYouAplied from "./HaveYouAplied";

const ApplicationTile = (props) => {
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(application.job.rating);
  const [status, setStatus] = useState("apply");
  const navigate = useNavigate();

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  useEffect(() => {
    if (application.status) {
      setStatus(application.status);
    }
  }, [application.status]);

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRating(response.data.rating);
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching rating",
        });
      });
  };

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        fetchRating();
        setOpen(false);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        fetchRating();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusUpdate = (newStatus) => {
    if (application.status == "apply") {
      setStatus(application.status);
    }

    setStatus(newStatus);
  };

  const colorSet = {
    applied: "#041124",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  return (
    <div className="border-[#103874] border-2 p-4 md:p-6 rounded-3xl hover:border-cyan-400 shadow-md mb-4 bg-[#02101E] text-cyan-400">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <div className="flex md:flex-row items-center gap-4">
            <div className="flex flex-col w-full">
              <h3 className="text-lg md:text-xl text-white font-black uppercase">
                {application.job.title}
              </h3>
              <div className="companyName flex flex-col md:flex-row gap-2 md:gap-8">
                {application.job.companyName && (
                  <p className="font-semibold">{application.job.companyName}</p>
                )}
                {application.job.salary && (
                  <>
                    <span className="hidden md:inline">|</span>
                    <p className="font-semibold">{application.job.salary}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-end justify-end w-full md:w-auto">
              {status === "apply" && (
                <HaveYouAplied
                  job={application.job}
                  onStatusUpdate={handleStatusUpdate}
                />
              )}
              <div
                className="text-white shadow-black shadow-2xl border-2 border-cyan-400 font-bold px-4 py-2 rounded mb-2"
                style={{ background: colorSet[status] }}
              >
                {status}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p
              className="overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {application.job.jobDescription}
            </p>
          </div>
          <div className="flex items-center align-middle justify-center">
            <div className="bg-cyan-800 h-[1px] md:h-[2px] flex-shrink-0 w-full my-2 shadow-xl shadow-cyan-500/20"></div>
          </div>
          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center lg:items-end lg:justify-end w-full lg:w-auto">
              {["accepted", "finished"].includes(application.status) && (
                <button
                  className="bg-[#041124] border border-cyan-400 text-cyan-400 px-4 py-2 rounded shadow-xl shadow-cyan-500/20"
                  onClick={() => {
                    fetchRating();
                    setOpen(true);
                  }}
                >
                  Rate Job
                </button>
              )}
              <button
                className="bg-[#041124] border border-cyan-400 text-white px-4 py-2 rounded mt-2 shadow-xl shadow-cyan-500/20"
                onClick={() => navigate(`/coldmail/${application.job._id}`)}
              >
                Cold Mail
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#041124] p-4 rounded shadow-lg min-w-[30%] text-white">
            <h4 className="mb-2">Rate Job</h4>
            <input
              type="number"
              min="1"
              max="5"
              value={rating === -1 ? null : rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full mb-4 bg-[#02101E] text-cyan-400"
            />
            <button
              className="bg-[#041124] border border-cyan-400 text-cyan-400 px-4 py-2 rounded shadow-xl shadow-cyan-500/20"
              onClick={changeRating}
            >
              Submit
            </button>
            <button
              className="bg-[#041124] border border-cyan-400 text-cyan-400 px-4 py-2 rounded mt-2 shadow-xl shadow-cyan-500/20"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Applications = () => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error retrieving applications",
        });
      });
  };

  return (
    <div className="flex flex-col items-center text-white p-5 mt-14">
      <h2 className="text-2xl font-bold">Track Applications</h2>
      <div className="flex flex-col w-full mt-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app._id} className="mb-4">
              <ApplicationTile application={app} />
            </div>
          ))
        ) : (
          <p>No Applications Found</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 p-12 text-center">
        <h2 className="h2 opacity-60">
          You have reached the end of your applications
        </h2>
        <p className="p2 opacity-60">
          Discover more opportunities on our Job Portal
        </p>
        <a
          href="/jobs"
          className="gap-2 bg-[#041124] border border-cyan-500/50 text-cyan-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:brightness-[50%] hover:bg-cyan-500 hover:text-[#041124] h-10 px-4 py-2"
        >
          Find More Jobs
        </a>
      </div>
    </div>
  );
};

ApplicationTile.propTypes = {
  application: PropType.object,
};

export default Applications;
