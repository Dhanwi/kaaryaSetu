import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SetPopupContext } from "../../App";
import axios from "axios";
import apiList from "../../lib/apiList";
import { userType } from "../../lib/isAuth";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

const JobDetails = () => {
  const { jobId } = useParams();
  const setPopup = useContext(SetPopupContext);
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // State to track if job is saved

  useEffect(() => {
    axios
      .get(`${apiList.jobs}/${jobId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setJob(response.data);
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching job details",
        });
      });
  }, [jobId, setPopup]);

  useEffect(() => {
    if (job) {
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
    }
  }, [job]);

  const handleApply = () => {
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        { status: "apply" },
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
          alert("You have already applied for this job");
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

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" p-8 mt-16 rounded shadow-md mb-4 bg-[#02101E] text-white">
      <div className="border p-4 rounded shadow-md mb-4 bg-[#02101E] text-white">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex">
              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-black uppercase text-cyan-400">
                  {job.title}
                </h3>
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
                  className="bg-[#041124] border border-cyan-400 cursor-pointer text-white text-center w-full lg:w-auto py-2 px-4 rounded"
                  onClick={handleApply}
                  disabled={userType() === "recruiter"}
                >
                  Apply
                </a>
                <div className="flex flex-col ml-3">
                  <IconButton onClick={handleSave}>
                    {isSaved ? (
                      <CheckIcon style={{ color: "cyan" }} /> // Add cyan color to check icon
                    ) : (
                      <SaveIcon style={{ color: "cyan" }} /> // Add cyan color to save icon
                    )}
                  </IconButton>
                  <div className="text-cyan-400 text-center mt-0">
                    {isSaved ? "Saved" : "Save"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5 mb-3">
              <div className="flex gap-3">
                {job.jobType && (
                  <p className="bg-[#041124] border border-cyan-400 rounded-full p-2">
                    {job.jobType}
                  </p>
                )}
                {job.workType && (
                  <p className="bg-[#041124] border border-cyan-400 rounded-full p-2">
                    {job.workType}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center align-middle mt-4 justify-center">
          <div className="bg-cyan-400 h-[1px] flex-shrink-0 w-full my-2"></div>
        </div>

        <div className="mt-4">
          <div className="mb-4">
            <div className="font-bold text-lg text-cyan-400">Job Title</div>
            <p className="text-sm">{job.title}</p>
          </div>
          <div className="mb-4">
            <div className="font-bold text-lg text-cyan-400">Company Name</div>
            <p className="text-sm">{job.companyName}</p>
          </div>
          {job.salary && (
            <div className="mb-4">
              <div className="font-bold text-lg text-cyan-400">Salary</div>
              <p className="text-sm">₹{job.salary}</p>
            </div>
          )}
          {job.skillsets && (
            <div className="mb-4">
              <div className="font-bold text-lg text-cyan-400">Skillsets</div>
              <div className="flex flex-wrap">
                {job.skillsets.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mb-4 mt-4">
            <div className="font-bold text-lg text-cyan-400">
              Job Description
            </div>
            <div
              className="bg-transparent rounded p-2 w-full text-sm overflow-x-hidden"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {job.jobDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
