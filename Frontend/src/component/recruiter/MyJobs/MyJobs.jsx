import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SetPopupContext } from "../../../App";
import apiList from "../../../lib/apiList";
import PropType from "prop-types";
import { FilterPopup } from "./FilterPopUp";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

const JobTile = (props) => {
  let navigate = useNavigate();
  const { job, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    ...job,
    hrDetails: job.hrDetails || [],
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
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

  const addPrompt = () => {
    setJobDetails((prev) => ({
      ...prev,
      prompts: [...prev.prompts, ""],
    }));
  };

  const handleClick = (location) => {
    navigate(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const handleJobUpdate = () => {
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
        handleCloseUpdate();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleCloseUpdate();
      });
  };

  const postedOn = new Date(job.dateOfPosting);

  return (
    <div className="p-8 my-5 w-full bg-[#041124] shadow-xl shadow-cyan-500/20 border border-cyan-500/50 rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 space-y-2 text-[#22D3EE]">
          <h5 className="text-xl font-bold">{job.title}</h5>
          <div>Role: {job.jobType}</div>
          <div>Salary: &#8377; {job.salary}</div>
          <div>Work Type: {job.workType}</div>
          <div>Date Of Posting: {postedOn.toLocaleDateString()}</div>
          <div>Number of Applicants: {job.maxApplicants}</div>
          <div>
            Remaining Number of Positions:{" "}
            {job.maxPositions - job.acceptedCandidates}
          </div>
          <div>Company Name: {job.companyName}</div>
          <div>Job Description: {job.jobDescription}</div>
          <div>HR Email: {job.hrMail}</div>
          <div>HR Contact Number: {job.hrContactNumber}</div>
          {job.hrDetails &&
            job.hrDetails.map((hrDetail, index) => (
              <div key={index} className="space-y-2">
                <div>Email: {hrDetail.hrMail}</div>
                <div>Contact Number: {hrDetail.hrContactNumber}</div>
                <textarea
                  value={hrDetail.hrInfo}
                  readOnly
                  className="w-full bg-transparent border-none text-[#22D3EE]"
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
            ))}
          <div className="flex flex-wrap">
            {job.skillsets.map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            {job.prompts.map((prompt, index) => (
              <div key={index}>
                <h6 className="font-semibold">Prompt {index + 1}:</h6>
                <p>{prompt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-4">
          <button
            className="bg-[#22D3EE] text-[#02101E] py-2 px-4 rounded flex items-center justify-center"
            onClick={() => handleClick(`/job/applications/${job._id}`)}
          >
            <FaEye className="mr-2" /> View Applications
          </button>
          <button
            className="bg-[#0891B2] text-[#02101E] py-2 px-4 rounded flex items-center justify-center"
            onClick={() => setOpenUpdate(true)}
          >
            <FaEdit className="mr-2" /> Update Details
          </button>
          <button
            className="bg-[#06B6D4] text-[#02101E] py-2 px-4 rounded flex items-center justify-center"
            onClick={() => setOpen(true)}
          >
            <FaTrash className="mr-2" /> Delete Job
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#041124] p-8 rounded shadow-md">
            <h4 className="text-xl mb-4 text-[#22D3EE]">Are you sure?</h4>
            <div className="flex space-x-4">
              <button
                className="bg-[#06B6D4] text-[#02101E] py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-[#22D3EE] text-[#02101E] py-2 px-4 rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {openUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-[#041124] p-8 rounded shadow-md max-w-3xl w-full mx-4 my-8 mt-[50rem]">
            <h4 className="text-xl mb-4 text-[#22D3EE]">Update Details</h4>
            <div className="space-y-4">
              <input
                type="datetime-local"
                value={jobDetails.deadline.substr(0, 16)}
                onChange={(event) =>
                  handleInput("deadline", event.target.value)
                }
                className="w-full p-2 border rounded bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
              />
              <input
                type="number"
                value={jobDetails.maxApplicants}
                onChange={(event) =>
                  handleInput("maxApplicants", event.target.value)
                }
                className="w-full p-2 border rounded bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
                min="1"
              />
              <input
                type="number"
                value={jobDetails.maxPositions}
                onChange={(event) =>
                  handleInput("maxPositions", event.target.value)
                }
                className="w-full p-2 border rounded bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
                min="1"
              />
              <textarea
                placeholder="Job Description"
                value={jobDetails.jobDescription}
                onChange={(e) => handleInput("jobDescription", e.target.value)}
                className="border rounded p-2 w-full bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={jobDetails.companyName}
                onChange={(e) => handleInput("companyName", e.target.value)}
                className="border rounded p-2 w-full bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
              />

              {jobDetails.prompts.map((prompt, index) => (
                <textarea
                  key={index}
                  placeholder={`Prompt ${index + 1}`}
                  value={prompt}
                  onChange={(e) => {
                    const newPrompts = [...jobDetails.prompts];
                    newPrompts[index] = e.target.value;
                    setJobDetails((prev) => ({ ...prev, prompts: newPrompts }));
                  }}
                  className="border rounded p-2 w-full bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
                />
              ))}
              <button
                className="bg-gray-500 text-white py-2 rounded"
                onClick={addPrompt}
              >
                Add Another Prompt
              </button>
              <select
                value={jobDetails.workType}
                onChange={(e) => handleInput("workType", e.target.value)}
                className="border rounded p-2 bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
              >
                <option value="Remote">Remote</option>
                <option value="InOffice">In Office</option>
              </select>
              {jobDetails.hrDetails.map((hrDetail, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    placeholder="HR Email"
                    value={hrDetail.hrMail}
                    onChange={(e) =>
                      handleHRDetailChange(index, "hrMail", e.target.value)
                    }
                    className="border rounded p-2 w-full bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
                  />
                  <input
                    type="text"
                    placeholder="HR Contact Number"
                    value={hrDetail.hrContactNumber}
                    onChange={(e) =>
                      handleHRDetailChange(
                        index,
                        "hrContactNumber",
                        e.target.value
                      )
                    }
                    className="border rounded p-2 w-full bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
                  />
                  <textarea
                    placeholder="HR Info"
                    value={hrDetail.hrInfo}
                    onChange={(e) =>
                      handleHRDetailChange(index, "hrInfo", e.target.value)
                    }
                    className="border rounded p-2 w-full bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
                  />
                </div>
              ))}
              <button
                className="bg-gray-500 text-white py-2 rounded"
                onClick={addHRDetail}
              >
                Add Another HR Info
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-[#0891B2] text-[#02101E] py-2 px-4 rounded"
                onClick={handleJobUpdate}
              >
                Update
              </button>
              <button
                className="bg-[#22D3EE] text-[#02101E] py-2 px-4 rounded"
                onClick={handleCloseUpdate}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

JobTile.propTypes = {
  job: PropType.object,
  getData: PropType.func,
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration != "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <div className="flex flex-col items-center mt-20 p-8 min-h-screen bg-[#02101E]">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-[#22D3EE]">My Jobs</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Jobs"
            value={searchOptions.query}
            onChange={(event) =>
              setSearchOptions({
                ...searchOptions,
                query: event.target.value,
              })
            }
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                getData();
              }
            }}
            className="w-96 p-2 border rounded bg-[#020C1B] text-[#22D3EE] border-cyan-500/50"
          />
          <button
            className="bg-[#22D3EE] text-[#02101E] p-2 rounded"
            onClick={() => getData()}
          >
            Search
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded"
            onClick={() => setFilterOpen(true)}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="flex flex-col items-stretch w-full">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            return <JobTile key={job._id} job={job} getData={getData} />;
          })
        ) : (
          <h5 className="text-center text-xl text-[#22D3EE]">No jobs found</h5>
        )}
      </div>
      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </div>
  );
};
MyJobs.propTypes = {
  props: PropType.object,
};

export default MyJobs;
