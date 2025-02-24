import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList, { server } from "../../lib/apiList";
import PropType from "prop-types";
import { FaSort, FaTimes, FaCheck, FaDownload, FaStar } from "react-icons/fa";

const FilterPopup = ({
  open,
  handleClose,
  searchOptions,
  setSearchOptions,
  getData,
}) => {
  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
        <div className="bg-[#041124] p-10 rounded shadow-xl mx-10 mt-20 shadow-cyan-500/20 min-w-[50%]">
          <h3 className="text-lg font-semibold mb-5 text-cyan-400">Sort</h3>
          <div className="mb-5">
            {Object.keys(searchOptions.sort).map((key) => (
              <div className="flex items-center justify-between mb-2" key={key}>
                <label className="flex items-center text-cyan-400">
                  <input
                    type="checkbox"
                    checked={searchOptions.sort[key].status}
                    onChange={(e) =>
                      setSearchOptions((prev) => ({
                        ...prev,
                        sort: {
                          ...prev.sort,
                          [key]: {
                            ...prev.sort[key],
                            status: e.target.checked,
                          },
                        },
                      }))
                    }
                  />{" "}
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <button
                  disabled={!searchOptions.sort[key].status}
                  onClick={() =>
                    setSearchOptions((prev) => ({
                      ...prev,
                      sort: {
                        ...prev.sort,
                        [key]: {
                          ...prev.sort[key],
                          desc: !prev.sort[key].desc,
                        },
                      },
                    }))
                  }
                  className="text-cyan-400"
                >
                  {searchOptions.sort[key].desc ? <FaSort /> : <FaSort />}
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
            onClick={getData}
          >
            Apply
          </button>
          <button className="ml-2 py-1 text-cyan-400" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

FilterPopup.propTypes = {
  open: PropType.bool,
  handleClose: PropType.func,
  searchOptions: PropType.object,
  setSearchOptions: PropType.func,
  getData: PropType.func,
};

const ApplicationTile = ({ application, getData }) => {
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [openEndJob, setOpenEndJob] = useState(false);
  const [rating, setRating] = useState(application.jobApplicant.rating);

  const appliedOn = new Date(application.dateOfApplication);

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating, applicantId: application.jobApplicant.userId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        getData();
        setOpen(false);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEndJob = () => {
    setOpenEndJob(false);
  };

  const getResume = () => {
    if (application.jobApplicant.resume) {
      const address = `${server}${application.jobApplicant.resume}`;
      axios
        .get(address, { responseType: "blob" })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch(() => {
          setPopup({ open: true, severity: "error", message: "Error" });
        });
    } else {
      setPopup({ open: true, severity: "error", message: "No resume found" });
    }
  };

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`;
    const statusData = { status, dateOfJoining: new Date().toISOString() };
    axios
      .put(address, statusData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setPopup({
          open: true,
          severity: "success",
          message: res.data.message,
        });
        getData();
        handleCloseEndJob();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleCloseEndJob();
      });
  };

  return (
    <div className="border border-cyan-500/50 p-4 rounded shadow-md mb-4 bg-[#041124]">
      <div className="flex">
        <div className="flex-shrink-0">
          <img
            src={`${server}${application.jobApplicant.profile}`}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        </div>
        <div className="ml-4 flex-1 text-cyan-400">
          <h5 className="text-lg">{application.jobApplicant.name}</h5>
          <p>Job Title: {application.job.title}</p>
          <p>Role: {application.job.jobType}</p>
          <p>Applied On: {appliedOn.toLocaleDateString()}</p>
          <p>SOP: {application.sop || "Not Submitted"}</p>
          <div className="flex flex-wrap mt-2">
            {application.jobApplicant.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 mr-2 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
          <button
            className="mt-2 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
            onClick={getResume}
          >
            <FaDownload className="inline-block mr-2" /> Download Resume
          </button>
          <button
            className="ml-2 bg-[#06B6D4] text-white py-2 px-4 rounded shadow-cyan-500/20"
            onClick={() => setOpenEndJob(true)}
          >
            <FaCheck className="inline-block mr-2" /> End Job
          </button>
          <button
            className="ml-2 bg-[#0891B2] text-white py-2 px-4 rounded shadow-cyan-500/20"
            onClick={() => setOpen(true)}
          >
            <FaStar className="inline-block mr-2" /> Rate Applicant
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#041124] p-8 rounded shadow-xl shadow-cyan-500/20">
            <h3 className="text-lg font-semibold text-cyan-400">
              Rate Applicant
            </h3>
            <input
              type="number"
              value={rating === -1 ? "" : rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded text-cyan-400"
              min="0"
              max="5"
            />
            <button
              className="ml-2 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
              onClick={changeRating}
            >
              Submit
            </button>
            <button className="ml-2 py-1 text-cyan-400" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}

      {openEndJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#041124] p-8 rounded shadow-xl shadow-cyan-500/20">
            <h3 className="text-lg font-semibold text-cyan-400">
              Are you sure?
            </h3>
            <div className="mt-4">
              <button
                className="bg-[#06B6D4] text-white py-2 px-4 rounded shadow-cyan-500/20"
                onClick={() => updateStatus("finished")}
              >
                Yes
              </button>
              <button
                className="ml-2 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
                onClick={handleCloseEndJob}
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

ApplicationTile.propTypes = {
  application: PropType.object,
  getData: PropType.func,
};

const AcceptedApplicants = () => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    sort: {
      "jobApplicant.name": { status: false, desc: false },
      "job.title": { status: false, desc: false },
      dateOfJoining: { status: true, desc: true },
      "jobApplicant.rating": { status: false, desc: false },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`status=accepted`];

    let asc = [],
      desc = [];
    Object.keys(searchOptions.sort).forEach((key) => {
      const item = searchOptions.sort[key];
      if (item.status) {
        item.desc ? desc.push(`desc=${key}`) : asc.push(`asc=${key}`);
      }
    });

    const queryString = [...searchParams, ...asc, ...desc].join("&");
    let address = `${apiList.applicants}${
      queryString ? "?" + queryString : ""
    }`;

    axios
      .get(address, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        setApplications([]);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  return (
    <div className="flex flex-col items-center bg-[#02101E] min-h-screen p-4">
      <h2 className="text-2xl font-bold text-cyan-400">Employees</h2>
      <button
        className="mb-4 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
        onClick={() => setFilterOpen(true)}
      >
        Filter
      </button>
      <div className="flex flex-col items-stretch w-full">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div key={application._id} className="mb-4">
              <ApplicationTile application={application} getData={getData} />
            </div>
          ))
        ) : (
          <p className="text-lg text-cyan-400">No Applications Found</p>
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

AcceptedApplicants.propTypes = {
  props: PropType.object,
};

export default AcceptedApplicants;
