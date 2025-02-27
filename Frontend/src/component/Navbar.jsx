import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

import isAuth, { userType } from "../lib/isAuth";

const Navbar = (props) => {
  let history = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Extract the current path as the redirect URL
  const redirectUrl = encodeURIComponent(location.pathname + location.search);

  const handleClick = (location) => {
    history(location);
    setMenuOpen(false);
  };
  const isAuthenticated = isAuth(); // Check authentication

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  ${
        isAuthenticated
          ? "bg-[#041124] p-2 text-white flex justify-between items-center border-b-2 border-white rounded-b-2xl" // Full navbar with styles
          : "bg-[#041124] p-2 flex justify-center items-center align-middle text-white" // Minimal navbar (Login/Signup only)
      }`}
    >
      {/* Show logo only if authenticated */}

      <div className="logo flex items-center gap-2 ml-2">
        <img src="/images/logo/ks1.png" alt="logo" className="h-14 w-16" />
        {isAuthenticated && (
          <img
            src="/images/logo/ksTxt.gif"
            alt="logo"
            className="hidden md:block md:h-14 md:w-[13vw]"
          />
        )}
      </div>

      <div className="lg:hidden flex items-center gap-2 p-2 text-white">
        <MenuIcon
          className="cursor-pointer"
          onMouseEnter={() => setMenuOpen(true)}
        />
        {menuOpen && (
          <div
            className="absolute top-0 right-0 mt-16 mr-2 bg-[#123456] border border-[#6b82a6] rounded-lg shadow-lg"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className="flex flex-col p-4">
              {isAuthenticated ? (
                userType() === "recruiter" ? (
                  <>
                    <Button color="inherit" onClick={() => handleClick("/")}>
                      Home
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/jobs")}
                    >
                      Jobs
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/addjob")}
                    >
                      Add Jobs
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/myjobs")}
                    >
                      My Jobs
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/employees")}
                    >
                      Employees
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/profile")}
                    >
                      Profile
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/about")}
                    >
                      About Us <InfoIcon />
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/logout")}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" onClick={() => handleClick("/")}>
                      Home
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/jobs")}
                    >
                      Jobs
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/applications")}
                    >
                      Applications
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/saved-jobs")}
                    >
                      Saved Jobs
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/profile")}
                    >
                      Profile
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/about")}
                    >
                      About Us <InfoIcon />
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => handleClick("/logout")}
                    >
                      Logout
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Button color="inherit" onClick={() => handleClick("/")}>
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() =>
                      handleClick(`/login?redirect=${redirectUrl}`)
                    }
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() =>
                      handleClick(`/signup?redirect=${redirectUrl}`)
                    }
                  >
                    Signup
                  </Button>
                  <Button color="inherit" onClick={() => handleClick("/about")}>
                    About Us <InfoIcon />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navbar buttons */}
      <div className="hidden lg:flex items-center gap-2 p-2 text-white">
        {isAuthenticated ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/jobs")}>
                Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleClick("/about")}>
                About Us <InfoIcon />
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleClick("/")}>
                Home
              </Button>
              <Button color="inherit" onClick={() => handleClick("/jobs")}>
                Jobs
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Applications
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/saved-jobs")}
              >
                Saved Jobs
              </Button>
              <Button color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleClick("/about")}>
                About Us <InfoIcon />
              </Button>
              <Button color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/")}>
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => handleClick(`/login?redirect=${redirectUrl}`)}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => handleClick(`/signup?redirect=${redirectUrl}`)}
            >
              Signup
            </Button>
            <Button color="inherit" onClick={() => handleClick("/about")}>
              About Us <InfoIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
