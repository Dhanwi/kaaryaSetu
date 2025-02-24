import { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiList from "../lib/apiList";
import { SetPopupContext } from "../App";
import { JobTile } from "./Home/JobTile";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    axios
      .get(apiList.savedJobs, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSavedJobs(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching saved jobs",
        });
      });
  }, [setPopup]);

  const handleDelete = (jobId) => {
    axios
      .delete(apiList.deleteSavedJob(jobId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
        setPopup({
          open: true,
          severity: "success",
          message: "Job deleted successfully",
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error deleting job",
        });
      });
  };

  return (
    <div className="saved-jobs-container mt-20 p-10 text-white bg-[#02101E]">
      <div className="header text-center mb-10">
        <h1 className="text-4xl font-black text-cyan-400">Your Saved Jobs</h1>
        <p className="text-lg text-gray-500 mt-2">
          Here are your saved jobs. Continue your application process or explore
          more opportunities to advance your career.
        </p>
        <p className="text-md text-gray-300 mt-2">
          Note: All saved jobs will be deleted automatically after 30 days.
        </p>
      </div>
      <div className="saved-jobs-list grid grid-cols-1 gap-6">
        {savedJobs.map((job) => (
          <div
            key={job._id}
            className="relative bg-[#041124] p-4 rounded shadow-xl shadow-cyan-500/20"
          >
            <JobTile job={job.jobDetails} />
            <IconButton
              className="absolute top-2 right-2"
              onClick={() => handleDelete(job._id)}
              style={{ color: "#D1345B" }} // Add red color to delete icon
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 p-12 text-center">
        <h2 className="h2 opacity-60 text-cyan-400">
          Need More Opportunities?
        </h2>
        <p className="p2 opacity-60">
          Don&apos;t stop here! Explore more job listings and find the perfect
          match for your skills and career goals.
        </p>
        <a
          href="/jobs"
          className="gap-2 bg-[#041124] border border-cyan-500/50 text-cyan-400 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:brightness-[50%] hover:bg-cyan-500 hover:text-[#041124] h-10 px-4 py-2"
        >
          Find More Jobs
        </a>
      </div>
      <div className="footer text-center mt-10">
        <h2 className="text-2xl font-semibold text-cyan-400">Explore More</h2>
        <p className="text-md text-gray-300 mt-2">
          Discover new opportunities and advance your career.
        </p>
      </div>
    </div>
  );
};

export default SavedJobs;
