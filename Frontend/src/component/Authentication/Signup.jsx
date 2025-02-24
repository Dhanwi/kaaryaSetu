import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import isAuth from "../../lib/isAuth";
import SkillInput from "./SkillInput";
import FileUploadInput from "../../lib/FileUploadInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import PasswordInput from "../../lib/PasswordInput";
import EmailInput from "../../lib/EmailInput";
import { CloudUpload } from "@mui/icons-material"; // Just the icon.
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import StarIcon from "@mui/icons-material/Star";
import "../../styles/customStyles.css"; // Import the custom CSS file
import MultifieldInput from "./MultifieldInput";

const Signup = () => {
  const navigate = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    education: [{ institutionName: "", startYear: "", endYear: "" }], // Ensure initial value
    skills: [],
    resume: "",
    profile: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");
  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: { untouched: true, required: true, error: false, message: "" },
    password: { untouched: true, required: true, error: false, message: "" },
    name: { untouched: true, required: true, error: false, message: "" },
  });

  const handleInput = (key, value) => {
    setSignupDetails({ ...signupDetails, [key]: value });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: { required: true, untouched: false, error: status, message },
    });
  };

  const validateInputs = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((key) => {
      if (inputErrorHandler[key].required && inputErrorHandler[key].untouched) {
        tmpErrorHandler[key] = {
          required: true,
          untouched: false,
          error: true,
          message: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        };
      } else {
        tmpErrorHandler[key] = inputErrorHandler[key];
      }
    });
    return tmpErrorHandler;
  };

  const handleSignup = (isRecruiter) => {
    const tmpErrorHandler = validateInputs();
    let updatedDetails = { ...signupDetails };

    if (phone) {
      updatedDetails.contactNumber = `+${phone}`;
    }

    updatedDetails.education = signupDetails.education
      .filter((obj) => obj.institutionName.trim() !== "")
      .map((obj) => {
        if (obj.endYear === "") delete obj.endYear;
        return obj;
      });

    const verified = !Object.keys(tmpErrorHandler).some(
      (key) => tmpErrorHandler[key].error
    );

    if (verified) {
      if (signupDetails.password !== signupDetails.confirmPassword) {
        setPopup({
          open: true,
          severity: "error",
          message: "Passwords do not match",
        });
        return;
      }

      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({ open: true, severity: "error", message: "Incorrect Input" });
    }
  };

  const handleGoogleSuccess = (response) => {
    const token = response.credential;
    // Get the selected user type from the form

    axios
      .post(apiList.googleSignup, { token, type: signupDetails.type }) // Send selected type
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("type", response.data.type);
        setLoggedin(isAuth());

        // Redirect to home ("/") after successful signup
        window.location.href = "/";
        // window.location.reload(); // Forces a fresh state update
        setPopup({
          open: true,
          severity: "success",
          message: "Logged in successfully",
        });
      })
      .catch((err) => {
        console.error("Google Signup Error:", err);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const handleGoogleFailure = (response) => {
    setPopup({
      open: true,
      severity: "error",
      message: "Google Sign In was unsuccessful. Try again later",
    });
  };

  const isSignup = window.location.pathname.includes("signup");

  return loggedin ? (
    navigate("/")
  ) : (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="relative flex items-center h-screen overflow-y-hidden p-8 bg-[#02101E]">
        <div className="flex items-center gap-8 justify-center mt-10 w-full rounded-3xl p-6">
          <div className="flex rounded-l-3xl w-full">
            <div className="flex flex-col w-full items-center justify-center align-middle place-content-center gap-4">
              <div className="text-cyan-400 text-xl mb-1 font-serif italic">
                <StarIcon /> Elevate Your Career Journey! <StarIcon />
              </div>
              <div className="text-cyan-400 text-center text-sm mb-1 font-serif">
                Join
                <span className="text-cyan-400"> KaaryaSetu </span> today and
                unlock a treasure trove of job opportunities tailored
                specifically to your unique skills and aspirations. Benefit from
                exclusive features like{" "}
                <span className="text-cyan-400">
                  {" "}
                  direct cold mailing, insider HR insights, personalized resume
                  reviews,{" "}
                </span>
                and much more. Your dream job is just a click away—take the leap
                and start your <span className="text-cyan-400">
                  {" "}
                  success{" "}
                </span>{" "}
                story with us!
              </div>
              <div className="text-cyan-400 text-3xl mb-10 font-serif italic">
                KaaryaSetu
              </div>
              <div>
                <h1 className="text-4xl font-bold text-center mb-4 text-cyan-400">
                  Create your account
                </h1>
              </div>
              <div className="mb-4">
                <label className="block mb-1 items-center text-center text-cyan-400">
                  Choose a Category
                </label>
                <select
                  value={signupDetails.type}
                  onChange={(event) => handleInput("type", event.target.value)}
                  className="border border-cyan-500/50 font-semibold rounded-lg p-2 w-[30vw] bg-[#041124] text-cyan-400"
                >
                  <option value="applicant">Applicant</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
              <div className="text-cyan-400 flex flex-col items-center align-middle gap-5">
                <div>SignUp/Login through Google</div>
                <div>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    text={isSignup ? "signup_with" : "signin_with"} // Change text dynamically
                    key={isSignup} // Force re-render when isSignup changes
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#041124] bg-opacity-50 mt-6 backdrop-blur-lg shadow-lg rounded-3xl border-x-2 border-cyan-500/50 px-6 py-3 max-w-lg items-center justify-center lg:w-2/3 w-full h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="">
              <div className="flex items-center text-cyan-400 justify-center mt-8 mb-5">
                ----------------Or with email and password----------------
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-cyan-400">Name *</label>
                <input
                  type="text"
                  value={signupDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={`border-y-2 hover:shadow-cyan-500/20 hover:shadow-sm rounded-lg bg-[#02101E] border-cyan-500/50 p-2 w-full text-cyan-400 ${
                    inputErrorHandler.name.error ? "border-red-500" : ""
                  }`}
                  onBlur={(event) => {
                    if (event.target.value === "")
                      handleInputError("name", true, "Name is required");
                    handleInputError("name", false, "");
                  }}
                />
                {inputErrorHandler.name.error && (
                  <span className="text-red-500 text-sm">
                    {inputErrorHandler.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-cyan-400  mb-4">
                <label className="block mb-1 text-cyan-400">Email *</label>
                <EmailInput
                  value={signupDetails.email}
                  onChange={(event) => handleInput("email", event.target.value)}
                  inputErrorHandler={inputErrorHandler}
                  handleInputError={handleInputError}
                  required={true}
                  className={inputErrorHandler.email.error ? "error" : ""}
                />
              </div>

              <PasswordInput
                label="Password *"
                value={signupDetails.password}
                onChange={(event) =>
                  handleInput("password", event.target.value)
                }
                onBlur={(event) => {
                  if (event.target.value === "")
                    handleInputError("password", true, "Password is required");
                  else handleInputError("password", false, "");
                }}
              />
              <div className="mb-4">
                <label className="block mb-1 text-cyan-400">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={signupDetails.confirmPassword}
                  onChange={(event) =>
                    handleInput("confirmPassword", event.target.value)
                  }
                  className={`border-y-2 hover:shadow-cyan-500/20 hover:shadow-sm rounded-lg bg-[#02101E] border-cyan-500/50 p-2 w-full text-cyan-400 ${
                    inputErrorHandler.password.error ? "border-red-500" : ""
                  }`}
                  onBlur={(event) => {
                    if (event.target.value === "")
                      handleInputError(
                        "password",
                        true,
                        "Password is required"
                      );
                    handleInputError("password", false, "");
                  }}
                />
                {inputErrorHandler.password.error && (
                  <span className="text-red-500 text-sm">
                    {inputErrorHandler.password.message}
                  </span>
                )}
              </div>
              {signupDetails.type === "applicant" ? (
                <>
                  <div className="mb-4">
                    <label className="block mb-1 text-cyan-400">
                      Contact Number *
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={setPhone}
                      className="border-y-2 hover:shadow-cyan-500/20 hover:shadow-sm rounded-lg bg-[#02101E] border-cyan-500/50 p-2 w-full text-cyan-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-1 text-cyan-400">
                      Education
                    </label>
                    <MultifieldInput
                      education={signupDetails.education}
                      setEducation={(newEducation) =>
                        handleInput("education", newEducation)
                      }
                    />
                  </div>
                  <SkillInput
                    signupDetails={signupDetails}
                    setSignupDetails={setSignupDetails}
                  />
                  <FileUploadInput
                    label="Upload Resume"
                    uploadTo={apiList.uploadResume}
                    handleInput={handleInput}
                    identifier="resume"
                    icon={<CloudUpload style={{ color: "#22D3EE" }} />}
                  />
                  <FileUploadInput
                    label="Upload Profile Photo"
                    uploadTo={apiList.uploadProfileImage}
                    handleInput={handleInput}
                    identifier="profile"
                    icon={<CloudUpload style={{ color: "#22D3EE" }} />}
                  />
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block mb-1 text-cyan-400">
                      Bio (up to 250 words)
                    </label>
                    <textarea
                      className="placeholder-cyan-400 border-y-2 border-x-2 hover:shadow-cyan-500/20 text-cyan-400 hover:shadow-sm rounded-lg bg-[#02101E] border-cyan-500/50 p-2 w-full"
                      value={signupDetails.bio}
                      onChange={(event) =>
                        handleInput("bio", event.target.value)
                      }
                      rows={8}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-cyan-400">
                      Contact Number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={phone}
                      onChange={setPhone}
                      className="border-y-2 hover:shadow-cyan-500/20 hover:shadow-sm rounded-lg bg-[#02101E] border-cyan-500/50 p-2 w-full text-cyan-400"
                    />
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  signupDetails.type === "applicant"
                    ? handleSignup(false)
                    : handleSignup(true);
                }}
                className="bg-[#041124] border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded shadow-xl shadow-cyan-500/20 w-full"
              >
                Signup
              </button>

              <div className="text-center mt-4 mb-5 text-sm text-[#fff]">
                Already registered,{" "}
                <a
                  className="text-sm text-sky-500 hover:underline hover:text-[#0495af]"
                  href="/login"
                >
                  {" "}
                  Login here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
