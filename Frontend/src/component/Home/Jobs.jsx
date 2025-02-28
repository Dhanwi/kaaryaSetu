import { useEffect, useState, useContext } from "react";
import { SetPopupContext } from "../../App";
import axios from "axios";
import apiList from "../../lib/apiList";
import { FilterPopup } from "./FilterPopup";
import { JobTile } from "./JobTile";
import ErrorBoundary from "../ErrorBoundary";
import { Filterlg } from "./Filterlg";

const Jobs = () => {
  const setPopup = useContext(SetPopupContext);
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      intern: false,
      wfh: false,
    },
    workType: {
      remote: false,
      inOffice: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: { status: false, desc: false },
      duration: { status: false, desc: false },
      rating: { status: false, desc: false },
    },
  });

  useEffect(() => {
    getData(searchOptions);
  }, []);

  const getData = (options = searchOptions) => {
    let searchParams = [];
    if (options.query) {
      searchParams.push(`q=${options.query}`);
    }
    if (options.jobType.fullTime) {
      searchParams.push(`jobType=Full%20Time`);
    }
    if (options.jobType.partTime) {
      searchParams.push(`jobType=Part%20Time`);
    }
    if (options.jobType.intern) {
      searchParams.push(`jobType=Internship`);
    }
    if (options.jobType.wfh) {
      searchParams.push(`jobType=Work%20From%20Home`);
    }
    if (options.workType.remote) {
      searchParams.push(`workType=Remote`);
    }
    if (options.workType.inOffice) {
      searchParams.push(`workType=InOffice`);
    }
    if (options.salary[0] !== 0) {
      searchParams.push(`salaryMin=${options.salary[0] * 1000}`);
    }
    if (options.salary[1] !== 100) {
      searchParams.push(`salaryMax=${options.salary[1] * 1000}`);
    }
    if (options.duration !== "0") {
      searchParams.push(`duration=${options.duration}`);
    }

    let asc = [],
      desc = [];
    Object.keys(options.sort).forEach((key) => {
      const item = options.sort[key];
      if (item.status) {
        item.desc ? desc.push(`desc=${key}`) : asc.push(`asc=${key}`);
      }
    });
    const queryString = [...searchParams, ...asc, ...desc].join("&");
    let address = `${apiList.jobs}`;
    if (queryString) {
      address += `?${queryString}`;
    }

    axios
      .get(address, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setJobs(
          response.data.filter((job) => new Date(job.deadline) > new Date())
        );
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching jobs",
        });
      });
  };

  return (
    <>
      <div className="flex flex-col bg-[#041124] text-cyan-400 top-0 pt-8 items-center">
        <div className="flex flex-col items-center w-full fixed bg-[#041124] pt-10 z-10 border-b-2 border-cyan-400 shadow-xl shadow-cyan-500/20">
          <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
          <div className="flex mb-7 items-center space-x-4">
            <div className="relative w-52 sm:w-52">
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
                className="w-full p-2 text-black border rounded pr-10"
              />
              <button
                className="absolute right-0 top-0 h-full bg-[#02101E] text-cyan-400 p-2 rounded-r shadow-xl shadow-cyan-500/20"
                onClick={() => getData()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <button
              className="bg-[#02101E] text-cyan-400 p-2 rounded flex items-center justify-center lg:hidden shadow-xl shadow-cyan-500/20"
              onClick={() => setFilterOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 5h18v2H3zm2 7h14v2H5zm4 7h6v2H9z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="lg:hidden flex flex-col w-full mt-44 px-4 sm:px-0 sm:w-3/4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="mb-4">
                <JobTile job={job} />
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>

        <div className="hidden lg:flex lg:flex-row w-full">
          <div className="lg:w-1/6 lg:fixed lg:top-0 lg:h-screen lg:bg-[#041124] lg:bg-opacity-50 lg:backdrop-blur-lg lg:p-6 lg:mt-44 lg:border-r-2 lg:border-cyan-400 shadow-xl shadow-cyan-500/20">
            <Filterlg
              open={filterOpen}
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
              handleClose={() => setFilterOpen(false)}
              getData={getData}
            />
          </div>
          <div className="flex flex-col lg:w-5/6 mt-44 px-4 lg:ml-[16.67%]">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="mb-4">
                  <JobTile job={job} />
                </div>
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
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
    </>
  );
};

export default Jobs;
