// PropType install
import PropTypes from "prop-types";

export const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    open && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg"
        onClick={handleClose}
      >
        <div
          className="bg-transparent rounded-3xl shadow-md w-full max-w-2xl mx-4 sm:mx-6 md:mx-8 lg:mx-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0 text-sm sm:text-base">
                Job Type
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0">
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
                  <span className="ml-2 text-sm sm:text-base">Full Time</span>
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
                  <span className="ml-2 text-sm sm:text-base">Internship</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0 text-sm sm:text-base">
                Work Type
              </div>
              <div className="flex-1 flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0">
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
                  <span className="ml-2 text-sm sm:text-base">Remote</span>
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
                  <span className="ml-2 text-sm sm:text-base">InOffice</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#6d28d9] text-white py-2 px-4 rounded text-sm sm:text-base"
                onClick={() => {
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
    }),
    workType: PropTypes.shape({
      remote: PropTypes.bool,
      inOffice: PropTypes.bool,
    }),
    sort: PropTypes.shape({
      salary: PropTypes.shape({
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
