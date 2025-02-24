import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import "./EmailInput.css"; // Import the CSS file

const EmailInput = (props) => {
  const {
    label,
    value,
    onChange,
    inputErrorHandler,
    handleInputError,
    required,
    className,
  } = props;

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={inputErrorHandler.email.message}
      onBlur={(event) => {
        if (event.target.value === "") {
          if (required) {
            handleInputError("email", true, "Email is required");
          } else {
            handleInputError("email", false, "");
          }
        } else {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(event.target.value).toLowerCase())) {
            handleInputError("email", false, "");
          } else {
            handleInputError("email", true, "Incorrect email format");
          }
        }
      }}
      error={inputErrorHandler.email.error}
      className={`custom-email-input ${className}`} // Add a custom class
    />
  );
};

EmailInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputErrorHandler: PropTypes.shape({
    email: PropTypes.shape({
      message: PropTypes.string,
      error: PropTypes.bool,
    }),
  }).isRequired,
  handleInputError: PropTypes.func.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default EmailInput;
