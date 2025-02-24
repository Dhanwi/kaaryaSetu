// PropType install
import PropTypes from "prop-types";

export const Filterlg = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  const handleCheckboxChange = (event, category) => {
    const updatedOptions = {
      ...searchOptions,
      [category]: {
        ...searchOptions[category],
        [event.target.name]: event.target.checked,
      },
    };
    setSearchOptions(updatedOptions);
    getData(updatedOptions);
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } lg:block lg:sticky lg:top-0 lg:h-screen lg:bg-[#041124] lg:bg-opacity-50 lg:backdrop-blur-lg lg:p-6 lg:border-r-2 lg:border-cyan-400 shadow-xl shadow-cyan-500/20`}
    >
      <div className="space-y-6 text-cyan-400">
        <div className="flex items-end justify-end mb-10">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:brightness-[50%] border border-cyan-400 bg-transparent hover:bg-cyan-500 hover:text-[#041124] disabled:border-cyan-400 disabled:text-cyan-400 h-6 px-4 py-2"
            type="button"
            onClick={() => {
              const clearedOptions = {
                query: "",
                jobType: {
                  fullTime: false,
                  intern: false,
                  // wfh: false,
                },
                workType: {
                  remote: false,
                  inOffice: false,
                },
                // salary: [0, 100],
                // duration: "0",
                // sort: {
                //   salary: { status: false, desc: false },
                //   duration: { status: false, desc: false },
                //   rating: { status: false, desc: false },
                // },
              };
              setSearchOptions(clearedOptions);
              getData(clearedOptions);
            }}
          >
            Clear All
          </button>
        </div>
        <div className="flex items-center gap-3 justify-between">
          <h2 className="text-2xl font-bold">Filters</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Job Type</h3>
            <div className="flex flex-col space-y-2 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="fullTime"
                  checked={searchOptions.jobType.fullTime || false}
                  onChange={(event) => handleCheckboxChange(event, "jobType")}
                />
                <span className="ml-2">Full Time</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="intern"
                  checked={searchOptions.jobType.intern || false}
                  onChange={(event) => handleCheckboxChange(event, "jobType")}
                />
                <span className="ml-2">Internship</span>
              </label>
              {/*  */}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Work Type</h3>
            <div className="flex flex-col space-y-2 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remote"
                  checked={searchOptions.workType.remote || false}
                  onChange={(event) => handleCheckboxChange(event, "workType")}
                />
                <span className="ml-2">Remote</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inOffice"
                  checked={searchOptions.workType.inOffice || false}
                  onChange={(event) => handleCheckboxChange(event, "workType")}
                />
                <span className="ml-2">InOffice</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center lg:hidden">
            <button
              className="bg-[#02101E] border border-cyan-400 text-cyan-400 py-2 px-4 rounded shadow-xl shadow-cyan-500/20"
              onClick={() => {
                console.log("Applying filters with options:", searchOptions);
                getData(searchOptions);
                handleClose();
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Filterlg.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  searchOptions: PropTypes.shape({
    query: PropTypes.string,
    jobType: PropTypes.shape({
      fullTime: PropTypes.bool,
      // partTime: PropTypes.bool,
      intern: PropTypes.bool,
      // wfh: PropTypes.bool,
    }),
    workType: PropTypes.shape({
      remote: PropTypes.bool,
      inOffice: PropTypes.bool,
    }),
    salary: PropTypes.arrayOf(PropTypes.number),
    duration: PropTypes.string,
    sort: PropTypes.shape({
      salary: PropTypes.shape({
        status: PropTypes.bool,
        desc: PropTypes.bool,
      }),
      duration: PropTypes.shape({
        status: PropTypes.bool,
        desc: PropTypes.bool,
      }),
      rating: PropTypes.shape({
        status: PropTypes.bool,
        desc: PropTypes.bool,
      }),
    }),
  }),
  setSearchOptions: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};
