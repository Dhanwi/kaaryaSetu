// PropType install
import PropTypes from "prop-types";

export const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    open && (
      <div
        className=" fixed top-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg h-[70vh] w-[60vw] border-x-2 border-white rounded-3xl mt-8"
        onClick={handleClose}
      >
        <div
          className="bg-transparent rounded-3xl shadow-md w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1/4">Job Type</div>
              <div className="flex-1 flex justify-around">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="fullTime"
                    checked={searchOptions.jobType.fullTime || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">Full Time</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="intern"
                    checked={searchOptions.jobType.intern || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">Internship</span>
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/4">Work Type</div>
              <div className="flex-1 flex justify-around">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remote"
                    checked={searchOptions.workType.remote || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        workType: {
                          ...searchOptions.workType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">Remote</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inOffice"
                    checked={searchOptions.workType.inOffice || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        workType: {
                          ...searchOptions.workType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">InOffice</span>{" "}
                  {/* Update this line */}
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#6d28d9] text-white py-2 px-4 rounded"
                onClick={() => {
                  // console.log("Applying filters with options:", searchOptions);
                  getData(searchOptions);
                  handleClose();
                }}
              >
                Apply
              </button>
            </div>
            {/* <div className="flex items-center">
              <div className="w-1/4">Sort</div>
              <div className="flex-1 flex justify-around">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="salary"
                    checked={searchOptions.sort.salary.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2">Salary</span>
                  <button
                    disabled={!searchOptions.sort.salary.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            desc: !searchOptions.sort.salary.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.salary.desc ? "↓" : "↑"}
                  </button>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rating"
                    checked={searchOptions.sort.rating.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2">Rating</span>
                  <button
                    disabled={!searchOptions.sort.rating.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            desc: !searchOptions.sort.rating.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.rating.desc ? "↓" : "↑"}
                  </button>
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  );
};

FilterPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  searchOptions: PropTypes.shape({
    query: PropTypes.string,
    jobType: PropTypes.shape({
      fullTime: PropTypes.bool,
      partTime: PropTypes.bool,
      intern: PropTypes.bool,
      // wfh: PropTypes.bool,
    }),
    workType: PropTypes.shape({
      remote: PropTypes.bool,
      inOffice: PropTypes.bool,
    }),
    // salary: PropTypes.arrayOf(PropTypes.number),
    // duration: PropTypes.string,
    sort: PropTypes.shape({
      salary: PropTypes.shape({
        status: PropTypes.bool,
        desc: PropTypes.bool,
      }),
      // duration: PropTypes.shape({
      //   status: PropTypes.bool,
      //   desc: PropTypes.bool,
      // }),
      rating: PropTypes.shape({
        status: PropTypes.bool,
        desc: PropTypes.bool,
      }),
    }),
  }),
  setSearchOptions: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};
