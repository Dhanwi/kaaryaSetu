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
        className="text-sm"
        onClick={() => setOpen(true)}
        disabled={userType() === "recruiter"}
      >
        Have You Applied?
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-transparent backdrop-blur-sm border-2 border-white p-4 rounded">
            <h4 className="mb-4">Have You Applied?</h4>
            <div className="flex justify-end mt-2">
              <button
                className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
                onClick={handleApply}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 py-1 px-4 rounded"
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
