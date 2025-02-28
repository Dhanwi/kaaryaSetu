import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList, { server } from "../../lib/apiList";
import SkillInput from "../Authentication/SkillInput";
import FileUploadInput from "../../lib/FileUploadInput";
import {
  CloudUpload,
  Lock,
  Email,
  Person,
  School,
  FileUpload,
  Visibility,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { InputAdornment, TextField } from "@mui/material";

const MultifieldInput = ({ education, setEducation }) => {
  return (
    <div>
      {education.map((obj, key) => (
        <div className="flex mb-4" key={key}>
          <div className="flex-1 mr-2">
            <input
              type="text"
              placeholder={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400"
            />
          </div>
          <div className="flex-1 mr-2">
            <input
              type="number"
              placeholder="Start Year"
              value={obj.startYear}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
              className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400"
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
              className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400"
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
        className="bg-[#22D3EE] text-[#02101E] px-4 py-2 mt-4 shadow-xl shadow-cyan-500/20"
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

const EditProfile = () => {
  const setPopup = useContext(SetPopupContext);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
  });

  const [education, setEducation] = useState([
    { institutionName: "", startYear: "", endYear: "" },
  ]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handlePasswordUpdate = () => {
    if (newPassword !== confirmNewPassword) {
      setPopup({
        open: true,
        severity: "error",
        message: "Passwords do not match",
      });
      return;
    }

    axios
      .post(
        apiList.updatePassword,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setPopup({
          open: true,
          severity: "success",
          message: "Password updated successfully",
        });
        setShowPasswordFields(false);
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error updating password",
        });
      });
  };

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

  const handleUpdate = () => {
    const updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    axios
      .put(apiList.user, updatedDetails, {
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
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error updating profile details",
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
    <div className="flex flex-col mt-10 bg-[#02101E] text-cyan-400">
      <div className=" rounded-3xl py-6 w-full bg-[#041124] shadow-xl shadow-cyan-500/20">
        <div className="flex flex-col items-center mb-4">
          {profileDetails.profile && (
            <img
              src={`${server}${profileDetails.profile}`}
              alt="Profile"
              className="w-32 h-32 rounded-full border-y-4 border-cyan-500 mb-4"
            />
          )}
        </div>
        <div className="flex justify-center w-3/4 items-center mx-auto">
          <div className="flex flex-col">
            <div className="flex gap-4 flex-col mb-4">
              <TextField
                type="text"
                placeholder="Name"
                value={profileDetails.name}
                onChange={(event) => handleInput("name", event.target.value)}
                className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person className="text-cyan-400" />
                    </InputAdornment>
                  ),
                  style: { color: "#22D3EE", borderColor: "#22D3EE" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#22D3EE",
                    },
                    "&:hover fieldset": {
                      borderColor: "#06B6D4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0891B2",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#22D3EE",
                  },
                }}
              />
              <TextField
                type="email"
                placeholder="Email"
                value={profileDetails.email}
                onChange={(event) => handleInput("email", event.target.value)}
                className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400 mt-4"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email className="text-cyan-400" />
                    </InputAdornment>
                  ),
                  style: { color: "#22D3EE", borderColor: "#22D3EE" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#22D3EE",
                    },
                    "&:hover fieldset": {
                      borderColor: "#06B6D4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0891B2",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#22D3EE",
                  },
                }}
              />
              <button
                onClick={() => setShowPasswordFields(true)}
                className="bg-[#22D3EE] text-[#02101E] px-4 py-2 rounded w-full shadow-xl shadow-cyan-500/20 mt-4"
              >
                Set New Password
              </button>
              {showPasswordFields && (
                <div className="w-full gap-4 flex flex-col mt-4">
                  <TextField
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="text-cyan-400" />
                        </InputAdornment>
                      ),
                      style: { color: "#22D3EE", borderColor: "#22D3EE" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#22D3EE",
                        },
                        "&:hover fieldset": {
                          borderColor: "#06B6D4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0891B2",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#22D3EE",
                      },
                    }}
                  />
                  <TextField
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(event) =>
                      setConfirmNewPassword(event.target.value)
                    }
                    className="border border-cyan-500/50 p-2 w-full bg-[#041124] text-cyan-400 mt-4"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="text-cyan-400" />
                        </InputAdornment>
                      ),
                      style: { color: "#22D3EE", borderColor: "#22D3EE" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#22D3EE",
                        },
                        "&:hover fieldset": {
                          borderColor: "#06B6D4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0891B2",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#22D3EE",
                      },
                    }}
                  />
                  <button
                    onClick={handlePasswordUpdate}
                    className="bg-[#0891B2] text-[#02101E] px-4 py-2 rounded w-full shadow-xl shadow-cyan-500/20 mt-4"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex mb-5 flex-col">
                <label className="text-sm text-cyan-400 font-medium mb-1">
                  Education
                </label>
                <MultifieldInput
                  education={education}
                  setEducation={setEducation}
                />
              </div>
              <SkillInput
                signupDetails={profileDetails}
                setSignupDetails={setProfileDetails}
              />
              <div className="flex flex-col">
                <label className="text-sm font-medium text-cyan-400 mb-1 mt-3">
                  Resume
                </label>
                <FileUploadInput
                  label="Upload Resume"
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier="resume"
                  icon={<FileUpload className="text-cyan-400" />}
                  existingFile={profileDetails.resume}
                />
                {profileDetails.resume && (
                  <button
                    onClick={getResume}
                    className="bg-[#22D3EE] text-[#02101E] px-4 py-2 mb-4 rounded shadow-xl shadow-cyan-500/20"
                  >
                    <Visibility className="mr-2" />
                    View Your Uploaded Resume
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-cyan-400 font-medium mb-1 mt-3">
                  Profile Photo
                </label>
                <FileUploadInput
                  label="Upload Profile Photo"
                  uploadTo={apiList.uploadProfileImage}
                  handleInput={handleInput}
                  identifier="profile"
                  icon={<FileUpload className="text-cyan-400" />}
                />
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="bg-[#0891B2] text-[#02101E] px-6 py-2 rounded shadow-xl shadow-cyan-500/20 mt-4"
            >
              Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
