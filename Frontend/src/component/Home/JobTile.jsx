import { useEffect, useState, useContext } from "react";
import { SetPopupContext } from "../../App";
import axios from "axios";
import apiList from "../../lib/apiList";
import { userType } from "../../lib/isAuth";
import { useNavigate } from "react-router-dom";
// PropType install
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check"; // Import CheckIcon

export const JobTile = ({ job }) => {
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");
  const [isSaved, setIsSaved] = useState(false); // State to track if job is saved

  useEffect(() => {
    // Check if the job is already saved
    axios
      .get(apiList.savedJobs, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const savedJobIds = response.data.map((savedJob) => savedJob.jobId);
        if (savedJobIds.includes(job._id)) {
          setIsSaved(true);
        }
      })
      .catch((err) => {
        console.error("Error checking saved jobs", err);
      });
  }, [job._id]);

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        { status: "apply" }, // Ensure initial status is "apply"
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: "Job added to applications",
        });
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.message === "You have already applied for this job"
        ) {
          setPopup({
            open: true,
            severity: "info",
            message: "You have already applied for this job",
          });
        } else {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        }
      });
  };

  const handleSave = () => {
    if (isSaved) {
      setPopup({
        open: true,
        severity: "info",
        message: "This job is already saved",
      });
      return;
    }

    axios
      .post(
        apiList.saveJob(job._id),
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setIsSaved(true);
        setPopup({
          open: true,
          severity: "success",
          message: "Job saved successfully",
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  // const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <div className="border p-4 rounded shadow-md mb-4 bg-[#02101E] text-cyan-400">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-black uppercase">{job.title}</h3>
              <div className="companyName flex gap-8">
                {job.companyName && (
                  <p className="font-semibold">{job.companyName}</p>
                )}
                {job.salary && (
                  <>
                    <span>|</span>
                    <p className="font-semibold">₹{job.salary}</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-end justify-end align-middle">
              <button
                className="bg-[#041124] border border-cyan-400 cursor-pointer text-cyan-400 text-center w-full lg:w-auto py-2 px-4 rounded mb-2 shadow-xl shadow-cyan-500/20"
                onClick={() => navigate(`/job/${job._id}`)}
              >
                View Job
              </button>
              <div className="flex flex-col ml-3 items-center align-middle justify-center place-content-center">
                <IconButton onClick={handleSave}>
                  {isSaved ? (
                    <CheckIcon style={{ color: "cyan" }} /> // Add cyan color to check icon
                  ) : (
                    <SaveIcon style={{ color: "cyan" }} /> // Add cyan color to save icon
                  )}
                </IconButton>
                <div className="text-cyan-400 text-center rounded">
                  {isSaved ? "Saved" : "Save"}
                </div>
              </div>
            </div>
          </div>

          {job.skillsets && (
            <div className="flex flex-wrap mt-2">
              {job.skillsets.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          <div className="mt-4">
            <p
              className="overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
              dangerouslySetInnerHTML={{ __html: job.jobDescription }}
            />
          </div>

          <div className="flex items-center align-middle justify-center">
            <div className="bg-[#041124] h-[1px] md:h-[2px] flex-shrink-0 w-full my-2 shadow-xl shadow-cyan-500/20"></div>
          </div>

          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex gap-3">
              {job.jobType && (
                <p className="bg-[#041124] border border-cyan-400 rounded-full p-2 shadow-xl shadow-cyan-500/20">
                  {job.jobType}
                </p>
              )}
              {job.workType && (
                <p className="bg-[#041124] border border-cyan-400 rounded-full p-2 shadow-xl shadow-cyan-500/20">
                  {job.workType}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center lg:items-end lg:justify-end w-full lg:w-auto">
              <a
                href={
                  job.url &&
                  typeof job.url === "string" &&
                  job.url.startsWith("http")
                    ? job.url
                    : `https://${job.url || ""}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#041124] border border-cyan-400 cursor-pointer text-cyan-400 text-center w-full lg:w-auto py-2 px-4 rounded shadow-xl shadow-cyan-500/20"
                onClick={handleApply}
                disabled={userType() === "recruiter"}
              >
                Apply
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

JobTile.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    jobType: PropTypes.string,
    workType: PropTypes.string,
    url: PropTypes.string,
    salary: PropTypes.number,
    duration: PropTypes.number,
    deadline: PropTypes.string,
    recruiter: PropTypes.shape({
      name: PropTypes.string,
    }),
    companyName: PropTypes.string,
    funding: PropTypes.string,
    jobDescription: PropTypes.string,
    skillsets: PropTypes.arrayOf(PropTypes.string),
  }),
};
