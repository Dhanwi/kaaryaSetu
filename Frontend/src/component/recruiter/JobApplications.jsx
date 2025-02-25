import { useState, useEffect, useContext } from "react";
import { SetPopupContext } from "../../App";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiList, { server } from "../../lib/apiList";
import PropType from "prop-types";
import {
  FaSort,
  FaTimes,
  FaCheck,
  FaDownload,
  FaStar,
  FaFilter,
} from "react-icons/fa";

const FilterPopup = ({
  open,
  handleClose,
  searchOptions,
  setSearchOptions,
  getData,
}) => {
  const setPopup = useContext(SetPopupContext);

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
        <div className="bg-[#041124] p-10 rounded shadow-xl mx-10 mt-20 shadow-cyan-500/20 min-w-[50%]">
          <h3 className="text-lg font-semibold mb-5 text-cyan-400">
            Filter Applications
          </h3>
          <div className="mb-5">
            <h4 className="mb-2 text-cyan-400">Application Status</h4>
            {["rejected", "applied", "shortlisted"].map((status) => (
              <label
                key={status}
                className="flex items-center mb-2 text-cyan-400"
              >
                <input
                  type="checkbox"
                  name={status}
                  checked={searchOptions.status[status]}
                  onChange={(event) => {
                    setSearchOptions({
                      ...searchOptions,
                      status: {
                        ...searchOptions.status,
                        [event.target.name]: event.target.checked,
                      },
                    });
                  }}
                />
                <span className="ml-2 capitalize">{status}</span>
              </label>
            ))}
          </div>
          <h4 className="mb-2 text-cyan-400">Sort</h4>
          <div className="flex">
            {Object.keys(searchOptions.sort).map((key) => (
              <div key={key} className="flex items-center mx-4 text-cyan-400">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name={key}
                    checked={searchOptions.sort[key].status}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          [key]: {
                            ...searchOptions.sort[key],
                            status: event.target.checked,
                          },
                        },
                      });
                    }}
                  />
                  <span className="ml-2 capitalize">
                    {key.replace(/jobApplicant\./, "")}
                  </span>
                </label>
                <button
                  disabled={!searchOptions.sort[key].status}
                  onClick={() => {
                    setSearchOptions({
                      ...searchOptions,
                      sort: {
                        ...searchOptions.sort,
                        [key]: {
                          ...searchOptions.sort[key],
                          desc: !searchOptions.sort[key].desc,
                        },
                      },
                    });
                  }}
                  className="ml-2 text-cyan-400"
                >
                  {searchOptions.sort[key].desc ? <FaSort /> : <FaSort />}
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-5 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
            onClick={getData}
          >
            Apply
          </button>
          <button className="ml-2 py-2 text-cyan-400" onClick={handleClose}>
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
  const appliedOn = new Date(application.dateOfApplication);

  const handleClose = () => {
    setOpen(false);
  };

  const downloadResume = () => {
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
      .then(() => {
        setPopup({
          open: true,
          severity: "success",
          message: "Status updated successfully",
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const renderStatusButtons = () => {
    switch (application.status) {
      case "applied":
        return (
          <>
            <button
              className="bg-[#F59E0B] text-white py-2 px-4 rounded shadow-cyan-500/20 mr-2"
              onClick={() => updateStatus("shortlisted")}
            >
              <FaCheck className="inline-block mr-2" /> Shortlist
            </button>
            <button
              className="bg-[#EF4444] text-white py-2 px-4 rounded shadow-cyan-500/20"
              onClick={() => updateStatus("rejected")}
            >
              <FaTimes className="inline-block mr-2" /> Reject
            </button>
          </>
        );
      case "shortlisted":
        return (
          <>
            <button
              className="bg-[#10B981] text-white py-2 px-4 rounded shadow-cyan-500/20 mr-2"
              onClick={() => updateStatus("accepted")}
            >
              <FaCheck className="inline-block mr-2" /> Accept
            </button>
            <button
              className="bg-[#EF4444] text-white py-2 px-4 rounded shadow-cyan-500/20"
              onClick={() => updateStatus("rejected")}
            >
              <FaTimes className="inline-block mr-2" /> Reject
            </button>
          </>
        );
      case "rejected":
        return <span className="text-[#EF4444]">Rejected</span>;
      case "accepted":
        return <span className="text-[#10B981]">Accepted</span>;
      default:
        return null;
    }
  };

  return (
    <div className="border border-cyan-500/50 p-4 rounded shadow-md mb-4 bg-[#041124]">
      <div className="flex items-start">
        <img
          src={`${server}${application.jobApplicant.profile}`}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="flex-1 text-cyan-400">
          <h3 className="text-lg font-bold">{application.jobApplicant.name}</h3>
          <p>Applied On: {appliedOn.toLocaleDateString()}</p>
          <div className="mt-2">{renderStatusButtons()}</div>
          {/* <button
            className="mt-4 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
            onClick={downloadResume}
          >
            <FaDownload className="inline-block mr-2" /> Download Resume
          </button> */}
        </div>
      </div>
    </div>
  );
};

ApplicationTile.propTypes = {
  application: PropType.object,
  getData: PropType.func,
};

const JobApplications = () => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": { status: false, desc: false },
      dateOfApplication: { status: true, desc: true },
      "jobApplicant.rating": { status: false, desc: false },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];

    if (searchOptions.status.applied) searchParams.push("status=applied");
    if (searchOptions.status.shortlisted)
      searchParams.push("status=shortlisted");
    if (searchOptions.status.rejected) searchParams.push("status=rejected");

    let asc = [],
      desc = [];
    Object.keys(searchOptions.sort).forEach((key) => {
      const item = searchOptions.sort[key];
      if (item.status) {
        item.desc ? desc.push(`desc=${key}`) : asc.push(`asc=${key}`);
      }
    });

    const queryString = [...searchParams, ...asc, ...desc].join("&");
    let address = `${apiList.applicants}?jobId=${jobId}`;
    if (queryString) address += `&${queryString}`;

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
      <h2 className="text-2xl font-bold text-cyan-400">Applications</h2>
      <button
        className="mb-4 bg-[#22D3EE] text-white py-2 px-4 rounded shadow-cyan-500/20"
        onClick={() => setFilterOpen(true)}
      >
        <FaFilter className="inline-block mr-2" /> Filter
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

JobApplications.propTypes = {
  props: PropType.object,
};

export default JobApplications;
