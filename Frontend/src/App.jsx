import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./component/Navbar";
import Login from "./component/Authentication/Login";
import Logout from "./component/Authentication/Logout";
import Signup from "./component/Authentication/Signup";
import CreateJobs from "./component/recruiter/CreateJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup.jsx";
import isAuth, { userType } from "./lib/isAuth";
import Landing from "./pages/Landing";
import ErrorPage from "./component/ErrorPage";
import Payment from "./component/Payment.jsx";
import Applications from "./component/TrackApplication/Applications.jsx";
import MyJobs from "./component/recruiter/MyJobs/MyJobs.jsx";
import ParentColdMailATS from "./component/ColdMail/ParentColdMailATS.jsx";
import JobDetails from "./component/Home/JobDetails";
import SavedJobs from "./component/SavedJobs";
import Jobs from "./component/Home/Jobs.jsx";
import Profile from "./component/UserProfile/Profile.jsx";
import AboutUs from "./component/Landing/AboutUs";
import PrivacyPolicy from "./component/Footer/PrivacyPolicy.jsx";
import TermsConditions from "./component/Footer/TermsConditions.jsx";
import Footer from "./component/Footer/Footer.jsx";

export const SetPopupContext = createContext();

function App() {
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <SetPopupContext.Provider value={setPopup}>
      <Router future={{ v7_startTransition: true }}>
        <AppContent />
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </Router>
    </SetPopupContext.Provider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/jobs" element={<Jobs />} />
          <Route exact path="/applications" element={<Applications />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route
            exact
            path="/profile"
            element={
              userType() === "recruiter" ? <RecruiterProfile /> : <Profile />
            }
          />
          <Route exact path="/addjob" element={<CreateJobs />} />
          <Route exact path="/myjobs" element={<MyJobs />} />
          <Route
            exact
            path="/job/applications/:jobId"
            element={<JobApplications />}
          />
          <Route exact path="/employees" element={<AcceptedApplicants />} />
          <Route path="/coldmail/:jobId" element={<ParentColdMailATS />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route exact path="/termsconditions" element={<TermsConditions />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {location.pathname !== "/jobs" &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && <Footer />}
    </div>
  );
}

export default App;
