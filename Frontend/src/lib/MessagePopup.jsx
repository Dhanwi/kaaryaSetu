import { Snackbar, Slide } from "@mui/material/";
import { Alert } from "@mui/material";
import PropTypes from "prop-types";

const MessagePopup = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };
  return (
    <Snackbar
      open={props.open}
      onClose={handleClose}
      autoHideDuration={2000}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert
        onClose={handleClose}
        severity={props.severity}
        sx={{
          backgroundColor: "#041124",
          color: "#22D3EE",
          border: "1px solid #06B6D4",
          boxShadow: "0 4px 8px rgba(6, 182, 212, 0.2)",
        }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

MessagePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessagePopup;
