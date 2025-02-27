import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import isAuth from "../../lib/isAuth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import ResetPassword from "./ResetPassword";
import { FaUserCircle, FaLock, FaArrowRight, FaStar } from "react-icons/fa"; // Import icons

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Initialize useLocation
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());

  // Extract redirect URL from query parameters
  const redirectUrl = new URLSearchParams(location.search).get("redirect");

  useEffect(() => {
    if (loggedin) {
      navigate(redirectUrl || "/");
    }
  }, [loggedin, navigate, redirectUrl]);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const [forgotPassword, setForgotPassword] = useState(false);

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      const response = await fetch(apiList.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("type", data.type);
        setLoggedin(isAuth());
        setPopup({
          open: true,
          severity: "success",
          message: "Logged in successfully",
        });
      } else {
        setPopup({
          open: true,
          severity: "error",
          message: "Login failed",
        });
      }
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setForgotPassword(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const type = urlParams.get("type");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("type", type || "applicant"); // Default to applicant if type is missing

      setLoggedin(true);

      // **Fix: Properly remove token and type from URL**
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl); // Correctly removes query params
    }
  }, []);

  return loggedin ? null : (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="relative flex items-center h-screen mt-64 md:mt-0 md:overflow-y-hidden p-8 bg-[#02101E]">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-center mt-10 w-full rounded-3xl p-6">
          <div className="flex rounded-l-3xl w-full">
            <div className="flex flex-col w-full items-center justify-center align-middle place-content-center gap-4">
              <div className="text-[#22D3EE] text-xl mb-1 font-serif italic">
                Welcome Back!{" "}
              </div>
              <div className="text-[#22D3EE] text-center text-sm mb-1 font-serif italic">
                Your Career Progression Awaits!{" "}
                <FaStar className="inline-block" /> Log in to your profile and
                unlock a world of{" "}
                <span className="text-[#06B6D4]">Opportunity</span> tailored
                just for you. Dive into your{" "}
                <span className="text-[#06B6D4]">KaaryaSetu</span> experience
                and embark on a journey that could elevate your career to new
                heights.{" "}
                <div className="text-[#22D3EE] text-center text-sm mt-5 font-serif italic">
                  <FaStar className="inline-block" /> Explore vibrant job
                  prospects with just one click and connect with reputable
                  employers who value your skills. Your next big opportunity is
                  waiting—let us help you seize it!
                </div>
              </div>
              <div className="text-[#22D3EE] text-3xl mb-6 font-serif italic">
                KaaryaSetu
              </div>
              <div>
                <h1 className="text-4xl font-bold text-center mb-4 font-serif text-[#22D3EE]">
                  Your Next <span className="text-[#06B6D4]">Opportunity</span>{" "}
                  is Just a <span className="text-[#06B6D4]">Login</span> Away!{" "}
                </h1>
              </div>

              <div className="text-[hsl(0,0%,100%)] flex flex-col items-center align-middle gap-5">
                <div className="text-center mt-4 text-md font-serif font-thin">
                  Haven&apos;t registered yet?{" "}
                  <a
                    className="text-sm text-[#22D3EE] hover:underline hover:text-[#06B6D4]"
                    href="/signup"
                  >
                    {" "}
                    Signup
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#041124] bg-opacity-10 mt-6 backdrop-blur-lg shadow-xl shadow-cyan-500/20 rounded-3xl border-x-2 border-cyan-500/50 px-6 py-3 max-w-lg items-center justify-center lg:w-2/3 w-full h-[65vh] overflow-y-auto custom-scrollbar">
            <div>
              {forgotPassword ? (
                <ResetPassword onBackToLogin={handleBackToLogin} />
              ) : (
                <>
                  <div className="flex items-center text-[#22D3EE] justify-center mt-10 mb-5">
                    ----------------Or with email and password----------------
                  </div>
                  <div className="text-[#22D3EE] flex flex-col gap-5">
                    <div className="mb-4">
                      <label className="block mb-1">Email</label>
                      <div className="flex items-center">
                        <FaUserCircle className="mr-2" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={loginDetails.email}
                          onChange={(event) =>
                            handleInput("email", event.target.value)
                          }
                          className={`placeholder:text-sm placeholder-slate-200 border-y-2 hover:shadow-cyan-500 hover:shadow-sm rounded-lg bg-transparent border-gray-300 p-2 w-full ${
                            inputErrorHandler.email.error
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {inputErrorHandler.email.error && (
                        <span className="text-red-500 text-sm">
                          {inputErrorHandler.email.message}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Password</label>
                      <div className="flex items-center">
                        <FaLock className="mr-2" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={loginDetails.password}
                          onChange={(event) =>
                            handleInput("password", event.target.value)
                          }
                          className={`placeholder:text-sm placeholder-slate-200 border-y-2 hover:shadow-cyan-500 hover:shadow-sm rounded-lg bg-transparent border-gray-300 p-2 w-full ${
                            inputErrorHandler.password.error
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {inputErrorHandler.password.error && (
                        <span className="text-red-500 text-sm">
                          {inputErrorHandler.password.message}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleLogin}
                      className="bg-[#22D3EE] text-[#02101E] px-4 py-2 rounded w-full hover:bg-[#0891B2]"
                    >
                      Login
                    </button>

                    <div className="text-center mt-4 text-sm">
                      <button
                        onClick={handleForgotPassword}
                        className="text-sm text-[#22D3EE] hover:underline hover:text-[#06B6D4]"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
