import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  // FormControl,
  // InputLabel,
  // OutlinedInput,
  // InputAdornment,
  IconButton,
  // FormHelperText,
} from "@mui/material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = ({ label, value, onChange, onBlur }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-cyan-400">{label}</label>
      <div className="flex gap-1 mr-2">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="border-y-2 hover:shadow-cyan-500/20 hover:shadow-sm rounded-lg bg-[#02101E] border-cyan-500/50 p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-cyan-400"
        />
        <IconButton
          style={{ color: "#22D3EE" }}
          onClick={handleShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default PasswordInput;
