import { useContext, useState } from "react";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import PropType from "prop-types";

const CreateJobs = () => {
  const setPopup = useContext(SetPopupContext);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: "",
    maxPositions: "",
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    url: "",
    duration: 0,
    salary: "",
    jobDescription: "",
    companyName: "",
    hrDetails: [{ hrMail: "", hrContactNumber: "", hrInfo: "" }],
    prompts: [""],
    workType: "Remote",
  });

  const handleInput = (key, value) => {
    setJobDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handlePromptChange = (index, value) => {
    const newPrompts = [...jobDetails.prompts];
    newPrompts[index] = value;
    setJobDetails((prev) => ({ ...prev, prompts: newPrompts }));
  };

  const addPrompt = () => {
    setJobDetails((prev) => ({ ...prev, prompts: [...prev.prompts, ""] }));
  };

  const handleHRDetailChange = (index, key, value) => {
    const newHRDetails = [...jobDetails.hrDetails];
    newHRDetails[index][key] = value;
    setJobDetails((prev) => ({ ...prev, hrDetails: newHRDetails }));
  };

  const addHRDetail = () => {
    setJobDetails((prev) => ({
      ...prev,
      hrDetails: [
        ...prev.hrDetails,
        { hrMail: "", hrContactNumber: "", hrInfo: "" },
      ],
    }));
  };

  const handleUpdate = () => {
    axios
      .post(apiList.jobs, jobDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setJobDetails({
          title: "",
          maxApplicants: "",
          maxPositions: "",
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          url: "",
          salary: "",
          jobDescription: "",
          companyName: "",
          hrDetails: [{ hrMail: "", hrContactNumber: "", hrInfo: "" }],
          prompts: [""],
          workType: "Remote",
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

  return (
    <div className="flex mt-24 mb-10 flex-col items-center bg-[#02101E] text-[#22D3EE]">
      <h2 className="text-2xl font-bold mb-6">Add Job</h2>
      <div className="w-full max-w-md">
        <div className="border border-cyan-500/50 p-6 rounded shadow-xl shadow-cyan-500/20 bg-[#041124]">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              value={jobDetails.title}
              onChange={(e) => handleInput("title", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <textarea
              placeholder="Skills (comma-separated)"
              value={jobDetails.skillsets.join(",")}
              onChange={(e) =>
                handleInput(
                  "skillsets",
                  e.target.value.split(",").map((skill) => skill.trim())
                )
              }
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <textarea
              placeholder="Job Description (supports HTML)"
              value={jobDetails.jobDescription}
              onChange={(e) => handleInput("jobDescription", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={jobDetails.companyName}
              onChange={(e) => handleInput("companyName", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            {jobDetails.hrDetails.map((hrDetail, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="HR Email"
                  value={hrDetail.hrMail}
                  onChange={(e) =>
                    handleHRDetailChange(index, "hrMail", e.target.value)
                  }
                  className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
                />
                <input
                  type="text"
                  placeholder="HR Contact Number (start with +91)"
                  value={hrDetail.hrContactNumber}
                  onChange={(e) =>
                    handleHRDetailChange(
                      index,
                      "hrContactNumber",
                      e.target.value
                    )
                  }
                  className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
                />
                <textarea
                  placeholder="HR Info"
                  value={hrDetail.hrInfo}
                  onChange={(e) =>
                    handleHRDetailChange(index, "hrInfo", e.target.value)
                  }
                  className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
                />
              </div>
            ))}
            <button
              className="bg-[#0891B2] text-white py-2 rounded hover:bg-[#06B6D4]"
              onClick={addHRDetail}
            >
              Add Another HR Info
            </button>
            {jobDetails.prompts.map((prompt, index) => (
              <textarea
                key={index}
                placeholder={`Prompt ${index + 1} (supports HTML)`}
                value={prompt}
                onChange={(e) => handlePromptChange(index, e.target.value)}
                className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
              />
            ))}
            <button
              className="bg-[#0891B2] text-white py-2 rounded hover:bg-[#06B6D4]"
              onClick={addPrompt}
            >
              Add Prompt
            </button>
            <select
              value={jobDetails.jobType}
              onChange={(e) => handleInput("jobType", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 bg-[#020C1B] text-[#22D3EE]"
            >
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
            </select>
            <select
              value={jobDetails.workType}
              onChange={(e) => handleInput("workType", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 bg-[#020C1B] text-[#22D3EE]"
            >
              <option value="Remote">Remote</option>
              <option value="InOffice">In Office</option>
            </select>
            <input
              type="text"
              placeholder="Salary"
              value={jobDetails.salary}
              onChange={(e) => handleInput("salary", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <input
              type="datetime-local"
              value={jobDetails.deadline}
              onChange={(e) => handleInput("deadline", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <input
              type="text"
              placeholder="URL"
              value={jobDetails.url}
              onChange={(e) => handleInput("url", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <input
              type="number"
              placeholder="Max Applicants"
              value={jobDetails.maxApplicants}
              onChange={(e) => handleInput("maxApplicants", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <input
              type="number"
              placeholder="Positions Available"
              value={jobDetails.maxPositions}
              onChange={(e) => handleInput("maxPositions", e.target.value)}
              className="border border-cyan-500/50 rounded p-2 w-full bg-[#020C1B] text-[#22D3EE]"
            />
            <button
              className="bg-[#0891B2] text-white py-2 rounded hover:bg-[#06B6D4]"
              onClick={handleUpdate}
            >
              Create Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateJobs.propTypes = {
  props: PropType.object,
};
export default CreateJobs;
