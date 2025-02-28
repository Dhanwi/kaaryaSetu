import React, { useContext, useState } from "react";
import axios from "axios";
import apiList from "../../lib/apiList";
import { userType } from "../../lib/isAuth";
import PropTypes from "prop-types";
import { SetPopupContext } from "../../App";

const HaveYouAplied = ({ job, onStatusUpdate }) => {
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    const address = `${apiList.applications}/${job._id}/status`;
    const statusData = { status: "applied" };
    axios
      .put(address, statusData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        onStatusUpdate("applied");
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating status",
        });
        handleClose();
      });
  };

  return (
    <div>
      <button
        className="text-sm md:text-base bg-[#041124] border border-cyan-400 text-cyan-400 px-3 py-1 rounded shadow-md hover:bg-cyan-400 hover:text-[#041124] transition-colors duration-200"
        onClick={() => setOpen(true)}
        disabled={userType() === "recruiter"}
      >
        Have You Applied?
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#041124] backdrop-blur-sm border-2 border-cyan-400 p-4 md:p-6 rounded-lg w-[90%] md:w-[400px]">
            <h4 className="text-lg md:text-xl font-bold text-cyan-400 mb-4">
              Have You Applied?
            </h4>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-cyan-400 text-[#041124] font-semibold py-1 px-4 rounded hover:bg-cyan-500 transition-colors duration-200"
                onClick={handleApply}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-[#041124] font-semibold py-1 px-4 rounded hover:bg-gray-400 transition-colors duration-200"
                onClick={handleClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

HaveYouAplied.propTypes = {
  job: PropTypes.object,
  onStatusUpdate: PropTypes.func,
};

export default HaveYouAplied;
