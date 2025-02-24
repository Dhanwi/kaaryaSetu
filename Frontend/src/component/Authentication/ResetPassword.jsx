import { useState, useContext } from "react";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import PropTypes from "prop-types";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";

const ResetPassword = ({ onBackToLogin }) => {
  const setPopup = useContext(SetPopupContext);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleResetPassword = () => {
    if (newPassword !== confirmNewPassword) {
      setPopup({
        open: true,
        severity: "error",
        message: "Passwords do not match",
      });
      return;
    }

    axios
      .post(apiList.resetPassword, { email, newPassword })
      .then(() => {
        setPopup({
          open: true,
          severity: "success",
          message: "Password reset successfully",
        });
        setEmail("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowPasswordFields(false);
        setPasswordReset(true);
      })
      .catch(() => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error resetting password",
        });
      });
  };

  return (
    <div className="flex flex-col items-center p-8 bg-[#02101E]">
      <h2 className="text-2xl mb-3 text-[#22D3EE] font-serif">
        Reset Password
      </h2>
      <div className="flex flex-col w-full gap-4">
        <div className="mb-4">
          <label className="block mb-1 text-[#22D3EE]">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-[#22D3EE]" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="placeholder:text-sm placeholder-slate-200 border-y-2 hover:shadow-[#06B6D4] hover:shadow-sm text-cyan-400 rounded-lg bg-transparent border-gray-300 p-2 pl-10 w-full"
            />
          </div>
        </div>
        {showPasswordFields && (
          <div>
            <div className="mb-4">
              <label className="block text-[#22D3EE] mb-1">New Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-[#22D3EE]" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="placeholder:text-sm placeholder-slate-200 border-y-2 text-cyan-400  hover:shadow-[#06B6D4] hover:shadow-sm rounded-lg bg-transparent border-gray-300 p-2 pl-10 w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[#22D3EE] mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-[#22D3EE]" />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  className="placeholder:text-sm placeholder-slate-200 border-y-2 text-cyan-400  hover:shadow-[#06B6D4] hover:shadow-sm rounded-lg bg-transparent border-gray-300 p-2 pl-10 w-full"
                />
              </div>
            </div>
            <button
              onClick={handleResetPassword}
              className="bg-[#0891B2] text-white px-4 py-2 rounded w-full shadow-xl shadow-cyan-500/20"
            >
              Confirm
            </button>
          </div>
        )}
        {!showPasswordFields && (
          <button
            onClick={() => setShowPasswordFields(true)}
            className="bg-[#06B6D4] text-white px-4 py-2 rounded-lg w-full shadow-xl shadow-cyan-500/20"
          >
            Set Password
          </button>
        )}
        {passwordReset && (
          <div className="text-center mt-4">
            <button
              onClick={onBackToLogin}
              className="text-[#22D3EE] hover:underline flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" /> Go back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
};

export default ResetPassword;
