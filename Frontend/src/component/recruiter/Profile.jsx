import { useContext, useEffect, useState } from "react";
import { SetPopupContext } from "../../App";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import apiList from "../../lib/apiList";
import PropType from "prop-types";
import { FaUser, FaInfoCircle, FaPhone } from "react-icons/fa";

const Profile = () => {
  const setPopup = useContext(SetPopupContext);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber);
      })
      .catch(() => {
        setPopup({ open: true, severity: "error", message: "Error" });
      });
  };

  const handleInput = (key, value) => {
    setProfileDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    const updatedDetails = {
      ...profileDetails,
      contactNumber: phone ? `+${phone}` : "",
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
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

  return (
    <div className="flex mt-28 mb-10 flex-col items-center bg-[#02101E] text-[#22D3EE]">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="w-full max-w-md p-6 border border-cyan-500/50 rounded shadow-xl shadow-cyan-500/20 bg-[#041124]">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <FaUser className="text-[#22D3EE]" />
            <input
              type="text"
              placeholder="Name"
              value={profileDetails.name}
              onChange={(e) => handleInput("name", e.target.value)}
              className="w-full border border-cyan-500/50 p-2 rounded bg-[#020C1B] text-[#22D3EE]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaInfoCircle className="text-[#22D3EE]" />
            <textarea
              placeholder="Bio (up to 250 words)"
              rows={4}
              value={profileDetails.bio}
              onChange={(e) => handleInput("bio", e.target.value)}
              className="w-full border border-cyan-500/50 p-2 rounded bg-[#020C1B] text-[#22D3EE]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaPhone className="text-[#22D3EE]" />
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              containerClass="w-full"
              inputClass="w-full border border-cyan-500/50 p-2 rounded bg-[#020C1B] text-[#22D3EE]"
            />
          </div>
          <button
            className="bg-[#22D3EE] text-[#02101E] py-2 rounded hover:bg-[#0891B2] transition-all"
            onClick={handleUpdate}
          >
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  props: PropType.object,
};

export default Profile;
