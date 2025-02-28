import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList, { server } from "../../lib/apiList";
import SkillInput from "../Authentication/SkillInput";
import { Email, Phone, School, CalendarToday } from "@mui/icons-material";
import PropTypes from "prop-types";

const MultifieldInput = ({ education, setEducation }) => {
  return (
    <div>
      {education.map((obj, key) => (
        <div className="flex flex-col md:flex-row mb-4 gap-2" key={key}>
          <div className="flex-1">
            <input
              type="text"
              placeholder={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Start Year"
              value={obj.startYear}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
              className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400 rounded-lg"
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="End Year"
              value={obj.endYear}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
              className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400 rounded-lg"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          setEducation([
            ...education,
            { institutionName: "", startYear: "", endYear: "" },
          ])
        }
        className="bg-[#22D3EE] text-[#02101E] px-4 py-2 mt-4 rounded-lg shadow-xl shadow-cyan-500/20 hover:bg-[#0891B2] transition-colors"
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

const ViewProfile = () => {
  const setPopup = useContext(SetPopupContext);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    contactNumber: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
  });

  const [education, setEducation] = useState([
    { institutionName: "", startYear: "", endYear: "" },
  ]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfileDetails(response.data);
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName || "",
              startYear: edu.startYear || "",
              endYear: edu.endYear || "",
            }))
          );
        }
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const getResume = () => {
    if (profileDetails.resume) {
      const address = `${server}${profileDetails.resume}`;
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

  return (
    <div className="flex mt-10 w-full bg-[#02101E] text-cyan-400">
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 w-full">
        <div className="pic flex items-center justify-center mb-4 lg:w-1/4">
          <div className="flex">
            {profileDetails.profile && (
              <img
                src={`${server}${profileDetails.profile}`}
                alt="Profile"
                className="border-y-4 shadow-md w-32 h-32 lg:w-48 lg:h-48 shadow-cyan-500 border-cyan-500 rounded-full"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="bio flex flex-col w-full border-y-2 border-cyan-500/50 rounded-3xl p-4 md:p-5 shadow-xl shadow-cyan-500/20">
              <div>
                {profileDetails.name && (
                  <h2 className="text-xl md:text-2xl text-cyan-400 mb-2 font-bold">
                    {profileDetails.name}
                  </h2>
                )}
              </div>
              <div className="flex items-center text-cyan-400 font-bold text-sm md:text-md">
                <Email className="mr-2" />
                Email:
                {profileDetails.email && (
                  <h2 className="text-sm md:text-md ml-2 text-cyan-400 mb-2 font-bold">
                    {profileDetails.email}
                  </h2>
                )}
              </div>
              <div className="flex items-center text-cyan-400 font-bold text-sm md:text-md">
                <Phone className="mr-2" />
                Contact Number:
                {profileDetails.contactNumber && (
                  <h2 className="text-sm md:text-md ml-2 text-cyan-400 mb-2 font-bold">
                    {profileDetails.contactNumber}
                  </h2>
                )}
              </div>
            </div>

            <div className="education w-full p-4 md:p-5 border-x-2 border-cyan-500/50 rounded-3xl shadow-xl shadow-cyan-500/20">
              <div className="flex flex-col w-full">
                <label className="text-cyan-400 text-sm md:text-md">
                  Education:
                </label>

                <div className="justify-center rounded-lg p-2 gap-4 flex flex-col mb-8">
                  {education.map((obj, key) => (
                    <div
                      className="flex flex-col sm:flex-row border-2 border-cyan-500/50 bg-[#041124] justify-center text-center p-3 rounded-lg shadow-xl shadow-cyan-500/20"
                      key={key}
                    >
                      <div className="flex flex-col text-cyan-400 text-sm w-full gap-1">
                        <School className="self-center mb-1" />
                        Institution
                        <div className="flex-1 mr-2">
                          {education[key].institutionName && (
                            <h2 className="text-sm md:text-md bg-[#0891B2] p-1 rounded-lg text-[#02101E] font-bold">
                              {education[key].institutionName}
                            </h2>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col text-cyan-400 text-sm w-full gap-1">
                        <CalendarToday className="self-center mb-1" />
                        Start Year
                        <div className="flex-1 mr-2">
                          {education[key].startYear && (
                            <h2 className="text-sm md:text-md bg-[#0891B2] p-1 rounded-lg text-[#02101E] font-bold">
                              {education[key].startYear}
                            </h2>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col text-cyan-400 text-sm w-full gap-1">
                        <CalendarToday className="self-center mb-1" />
                        End Year
                        <div className="flex-1">
                          {education[key].endYear && (
                            <h2 className="text-sm md:text-md text-[#02101E] bg-[#0891B2] p-1 rounded-lg font-bold">
                              {education[key].endYear}
                            </h2>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="skill flex flex-col border-y-2 border-cyan-500/50 p-4 md:p-5 rounded-3xl w-full shadow-xl shadow-cyan-500/20">
              <SkillInput
                signupDetails={profileDetails}
                setSignupDetails={setProfileDetails}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center text-center border-y-2 border-cyan-500/50 p-4 md:p-5 rounded-3xl w-full shadow-xl shadow-cyan-500/20">
            <div className="flex flex-col">
              <label className="text-cyan-400 text-sm md:text-md">Resume</label>

              {profileDetails.resume && (
                <button
                  onClick={getResume}
                  className="bg-[#22D3EE] text-[#02101E] px-4 py-2 mt-2 rounded-lg shadow-xl shadow-cyan-500/20 hover:bg-[#0891B2] transition-colors"
                >
                  View Your Uploaded Resume
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
