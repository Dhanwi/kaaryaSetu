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
  CalendarToday,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";

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

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("editProfile");
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
    <div className="container mx-auto mt-14 p-4 bg-[#02101E] text-cyan-400">
      <div className="flex justify-between rounded-xl items-center text-lg w-full gap-5 text-cyan-400 mb-4">
        <button
          onClick={() => setSelectedTab("viewProfile")}
          className={`flex py-2 w-full border-x-2 border-b-2 rounded-xl justify-center ${
            selectedTab === "viewProfile"
              ? "bg-[#041124] rounded-xl text-[#22D3EE] font-bold shadow-xl shadow-cyan-500/20"
              : ""
          }`}
        >
          View Profile
        </button>
        <button
          onClick={() => setSelectedTab("editProfile")}
          className={`flex py-2 w-full rounded-xl border-b-2 border-x-2 justify-center ${
            selectedTab === "editProfile"
              ? "bg-[#041124] text-[#22D3EE] font-bold shadow-xl shadow-cyan-500/20"
              : ""
          }`}
        >
          Edit Profile
        </button>
      </div>
      {selectedTab === "viewProfile" && <ViewProfile />}
      {selectedTab === "editProfile" && <EditProfile />}
    </div>
  );
};

export default Profile;
