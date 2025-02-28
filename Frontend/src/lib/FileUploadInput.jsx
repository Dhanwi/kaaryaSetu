import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { LinearProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { SetPopupContext } from "../App";

const FileUploadInput = ({
  uploadTo,
  identifier,
  handleInput,
  label,
  icon,
  existingFile,
}) => {
  const setPopup = useContext(SetPopupContext);

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleUpload = () => {
    const data = new FormData();
    data.append("file", file);

    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    })
      .then((response) => {
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        console.log(response.data.url);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || err.message,
        });
        console.log(err.response);
      });
  };

  return (
    <div className="flex flex-col mb-4 w-full">
      <label className="text-sm md:text-base text-cyan-400 font-medium mb-1">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
        <label className="cursor-pointer bg-[#041124] border border-cyan-500/50 text-cyan-400 px-3 py-2 rounded shadow-xl shadow-cyan-500/20 w-full sm:w-auto">
          {icon || <CloudUpload style={{ color: "#22D3EE" }} />}
          <input
            type="file"
            className="hidden"
            onChange={(event) => {
              setFile(event.target.files[0]);
              setUploadPercentage(0);
            }}
          />
        </label>
        <input
          type="text"
          className="flex-grow p-2 border border-cyan-500/50 rounded bg-[#02101E] text-cyan-400 w-full sm:w-auto"
          placeholder="No file selected"
          value={file?.name || existingFile?.name || ""}
          readOnly
        />
        <button
          className={`px-4 py-2 rounded w-full sm:w-auto ${
            file || existingFile
              ? "bg-[#041124] border border-cyan-500/50 text-cyan-400 shadow-xl shadow-cyan-500/20"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          onClick={handleUpload}
          disabled={!file && !existingFile}
        >
          Upload
        </button>
      </div>
      <div>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          After choosing a file, click on upload to upload the file
        </p>
      </div>
      {uploadPercentage > 0 && (
        <div className="mt-2 w-full">
          <LinearProgress
            variant="determinate"
            value={uploadPercentage}
            style={{ backgroundColor: "#041124", color: "#22D3EE" }}
          />
        </div>
      )}
    </div>
  );
};

FileUploadInput.propTypes = {
  uploadTo: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  label: PropTypes.string,
  icon: PropTypes.element,
  existingFile: PropTypes.object,
};

export default FileUploadInput;
