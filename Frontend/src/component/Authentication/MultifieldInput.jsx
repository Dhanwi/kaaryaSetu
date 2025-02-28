import React from "react";
import PropTypes from "prop-types";
import { FaSchool, FaCalendarAlt, FaTimes } from "react-icons/fa";

const MultifieldInput = ({ education, setEducation }) => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 30;
  const maxYear = currentYear + 10;

  const handleEducationChange = (index, key, value) => {
    const newEducation = [...education];
    newEducation[index][key] = value;
    setEducation(newEducation);
  };

  const addEducationField = () => {
    setEducation([
      ...education,
      { institutionName: "", startYear: "", endYear: "" },
    ]);
  };

  const removeEducationField = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  return (
    <div className="space-y-4 bg-[#02101E] p-4 rounded-lg shadow-xl shadow-cyan-500/20">
      {education.map((obj, key) => (
        <div
          key={key}
          className="space-y-4 bg-[#041124] p-4 rounded-lg shadow-xl shadow-cyan-500/20 relative"
        >
          <FaTimes
            className="absolute top-2 right-2 text-[#06B6D4] cursor-pointer hover:text-[#0891B2] transition-colors"
            onClick={() => removeEducationField(key)}
          />
          <div className="flex flex-col space-y-1">
            <label className="text-sm md:text-base text-[#22D3EE] font-medium flex items-center">
              <FaSchool className="mr-2" /> Institution Name #{key + 1}
            </label>
            <input
              type="text"
              placeholder={`Institution Name #${key + 1}`}
              className="placeholder-neutral-200 placeholder:text-sm border-y-2 text-[#22D3EE] hover:shadow-cyan-500 hover:shadow-sm rounded-lg bg-transparent border-cyan-500/50 p-2 w-full focus:outline-none focus:border-cyan-500"
              value={education[key].institutionName}
              onChange={(event) =>
                handleEducationChange(
                  key,
                  "institutionName",
                  event.target.value
                )
              }
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col w-full space-y-1">
              <label className="text-sm md:text-base text-[#22D3EE] font-medium flex items-center">
                <FaCalendarAlt className="mr-2" /> Start Year
              </label>
              <input
                type="number"
                placeholder="Start Year"
                className="placeholder-neutral-200 placeholder:text-sm border-y-2 text-[#22D3EE] hover:shadow-cyan-500 hover:shadow-sm rounded-lg bg-transparent border-cyan-500/50 p-2 w-full focus:outline-none focus:border-cyan-500"
                value={obj.startYear}
                min={minYear}
                max={maxYear}
                onChange={(event) =>
                  handleEducationChange(key, "startYear", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <label className="text-sm md:text-base text-[#22D3EE] font-medium flex items-center">
                <FaCalendarAlt className="mr-2" /> End Year
              </label>
              <input
                type="number"
                placeholder="End Year"
                className="placeholder-neutral-200 placeholder:text-sm border-y-2 text-[#22D3EE] hover:shadow-cyan-500 hover:shadow-sm rounded-lg bg-transparent border-cyan-500/50 p-2 w-full focus:outline-none focus:border-cyan-500"
                value={obj.endYear}
                min={minYear}
                max={maxYear}
                onChange={(event) =>
                  handleEducationChange(key, "endYear", event.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addEducationField}
        className="mt-4 bg-[#22D3EE] hover:bg-[#0891B2] text-white py-2 px-4 rounded transition border border-cyan-500/50 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        Add another institution details
      </button>
    </div>
  );
};

MultifieldInput.propTypes = {
  education: PropTypes.array.isRequired,
  setEducation: PropTypes.func.isRequired,
};

export default MultifieldInput;
