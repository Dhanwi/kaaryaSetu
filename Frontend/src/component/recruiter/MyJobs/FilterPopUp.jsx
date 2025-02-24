// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { SetPopupContext } from "../../App";
// import apiList from "../../lib/apiList";
import PropType from "prop-types";

export const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-12 rounded shadow-md w-1/2">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1/4">Job Type</div>
              <div className="flex-1 flex justify-around">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="fullTime"
                    checked={searchOptions.jobType.fullTime}
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
                    name="partTime"
                    checked={searchOptions.jobType.partTime}
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
                  <span className="ml-2">Part Time</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="wfh"
                    checked={searchOptions.jobType.wfh}
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
                  <span className="ml-2">Work From Home</span>
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/4">Salary</div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={searchOptions.salary}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      salary: [event.target.value, searchOptions.salary[1]],
                    })
                  }
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>0</span>
                  <span>100000</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/4">Duration</div>
              <div className="flex-1">
                <select
                  value={searchOptions.duration}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      duration: event.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="0">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
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
                    name="duration"
                    checked={searchOptions.sort.duration.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2">Duration</span>
                  <button
                    disabled={!searchOptions.sort.duration.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            desc: !searchOptions.sort.duration.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.duration.desc ? "↓" : "↑"}
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
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => getData()}
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
  open: PropType.bool,
  handleClose: PropType.func,
  searchOptions: PropType.object,
  setSearchOptions: PropType.func,
  getData: PropType.func,
};