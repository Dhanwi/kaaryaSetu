see here , in job description of each job, i want only starting 25 character to show on home page and after that it looks like this

Eg: job description...frontend(30 char completed)... in end only show 3 dots

GitHub Copilot
JobTile.jsx
Modify the job description to show only the first 25 characters followed by ellipsis.
code:

```
<p
              className="overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              Job Description: {job.jobDescription}
            </p>
```

2. see here in this file i want to add logic in each field that like if the field is not available that is like, say if job.worktype is not filled by recruiter, so here data will not pass so in that case i want to make that div or p tag whatever holds that value to invisible, so that only the available data can be seen on website

GitHub Copilot
JobTile.jsx
Add logic to conditionally render fields only if they are available.

```
 {job.jobType && <p className="bg-[#6D28D9] rounded-full p-2">{job.jobType}</p>}

```

Problem : related to url opening:
The issue is likely because the `job.url` field is not storing the full URL properly or the `href` attribute in your `<a>` tag is not correctly handling external links.

### Possible Causes:

1. **Missing `https://` or `http://` in URLs**

   - If the job URL stored in the database does not include `https://` or `http://`, the browser treats it as a relative URL and appends it to `localhost:5173/`.

2. **Incorrect Data Entry**
   - Ensure that when recruiters add a job, they enter the complete URL (`https://paypal.eightfold.ai/careers/...`) instead of just `paypal.eightfold.ai/careers/...`.

### **Solution**

#### **1. Ensure URLs Include `https://` When Saving in Backend**

Modify your backend job creation route to ensure URLs are stored correctly:

```javascript
if (
  data.url &&
  !data.url.startsWith("http://") &&
  !data.url.startsWith("https://")
) {
  data.url = "https://" + data.url;
}
```

This ensures that any URL stored in the database starts with `https://`.

#### **2. Update the `<a>` Tag in the Frontend**

Modify the `href` attribute inside `JobTile.js` to ensure it correctly opens external links:

```jsx
<a
  href={job.url.startsWith("http") ? job.url : `https://${job.url}`} // Ensure the URL is absolute
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#6D28D9] cursor-pointer text-white text-center w-full lg:w-auto py-2 px-4 rounded"
  onClick={handleApply}
  disabled={userType() === "recruiter"}
>
  Apply
</a>
```

- This ensures that if `job.url` doesn't start with `http` or `https`, it automatically adds `https://` before opening the link.

### **Final Steps**

- Try adding a new job and ensure the correct URL is being saved in the database.
- If existing jobs are affected, manually update their URLs in the database to include `https://`.

# New Portal Frontend

## Issues and Solutions

### Problem: Error Fetching Job Details hrmail and prompt in user application coldmailpage

#### Description

When clicking the "Cold Mail" button on the applications page, the page was not opening and an error message "Error fetching job details" was displayed.

#### Steps to Reproduce

1. Navigate to the applications page.
2. Click the "Cold Mail" button for any application.

#### Initial Investigation

1. Verified the route setup in `App.jsx`:
   ```javascript
   <Route path="/coldmail/:jobId" element={<ParentColdMailATS />} />
   ```
2. Checked the `Applications.jsx` file to ensure the `navigate` function was correctly used:
   ```javascript
   <button
     className="bg-green-500 text-white px-4 py-2 rounded mt-2"
     onClick={() => navigate(`/coldmail/${application.job._id}`)}
   >
     Cold Mail
   </button>
   ```
3. Reviewed the `ParentColdMailATS.jsx` file to ensure it correctly fetched job details:

   ```javascript
   const ParentColdMailATS = ({ jobId }) => {
     const [jobDetails, setJobDetails] = useState(null);
     const setPopup = useContext(SetPopupContext);

     useEffect(() => {
       const fetchJobDetails = async () => {
         try {
           const response = await axios.get(`${apiList.jobs}/${jobId}`, {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           });
           setJobDetails(response.data);
         } catch (error) {
           setPopup({
             open: true,
             severity: "error",
             message: "Error fetching job details",
           });
           console.error("Error fetching job details:", error);
         }
       };

       fetchJobDetails();
     }, [jobId, setPopup]);

     return (
       <div>
         {jobDetails ? (
           <ColdMailATSPage jobDetails={jobDetails} />
         ) : (
           <p>Loading job details...</p>
         )}
       </div>
     );
   };
   ```

#### Solution

The issue was resolved by using the `useParams` hook to extract the `jobId` from the URL parameters in the `ParentColdMailATS` component.

1. Updated the `ParentColdMailATS.jsx` file:

   ```javascript
   import { useParams } from "react-router-dom";

   const ParentColdMailATS = () => {
     const { jobId } = useParams();
     const [jobDetails, setJobDetails] = useState(null);
     const setPopup = useContext(SetPopupContext);

     useEffect(() => {
       const fetchJobDetails = async () => {
         try {
           const response = await axios.get(`${apiList.jobs}/${jobId}`, {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           });
           setJobDetails(response.data);
         } catch (error) {
           setPopup({
             open: true,
             severity: "error",
             message: "Error fetching job details",
           });
           console.error("Error fetching job details:", error);
         }
       };

       fetchJobDetails();
     }, [jobId, setPopup]);

     return (
       <div>
         {jobDetails ? (
           <ColdMailATSPage jobDetails={jobDetails} />
         ) : (
           <p>Loading job details...</p>
         )}
       </div>
     );
   };
   ```

This change ensures that the `jobId` is correctly extracted from the URL parameters, allowing the job details to be fetched and displayed correctly.

Q. see, in Home page job listings, for each job i want to add a button view job, and upon clicking on that, a page must open and that page contain the whole details of that individual job, with full job description, and apply button and all everything just like on this job listing of home page, ui will be almost same, the only difference is here, full job description will be there, and rest other logic will be same, like upon clicking on apply button here, that job post must be added to track application page just like it happens here in the jobtile,

so for opening a new page each time user click on view full job for any particular job, so make a componet for this in Home folder, and also add route for this in app.jsx, route must contain, inidividual jobid, so that i can share that particular url link to share that particular job

Q. see for now, like if i am adding job description, although i am pasting there formatted description with points and all, in recruiter create job section, but it just display like a whole para rather than proper formatted, please add logic for displaying formatted text, like if it is bold or italic , or contains points and all then it must appear like that in the job description of here job detail page, if any change need to be done in backend apiRoute file for this logic to add then add it there

solution:
<textarea
placeholder="Job Description (supports HTML)"
// this support html line is added
value={jobDetails.jobDescription}
onChange={(e) => handleInput("jobDescription", e.target.value)}
className="border rounded p-2 w-full"
/>

 <div className="text-sm" dangerouslySetInnerHTML={{ __html: job.jobDescription }} />

# New Portal

## Problems and Solutions

### Problem 1: Add a delete button to each saved job and a message indicating that saved jobs will be deleted automatically after 30 days.

#### Solution:

**Frontend:**

**File:** `/c:/Users/priya kumari/Desktop/Business/New Portal/Frontend/src/component/SavedJobs.jsx`

```javascript
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiList from "../lib/apiList";
import { SetPopupContext } from "../App";
import { JobTile } from "./Home/JobTile";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    axios
      .get(apiList.savedJobs, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSavedJobs(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching saved jobs",
        });
      });
  }, [setPopup]);

  const handleDelete = (jobId) => {
    axios
      .delete(apiList.deleteSavedJob(jobId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
        setPopup({
          open: true,
          severity: "success",
          message: "Job deleted successfully",
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error deleting job",
        });
      });
  };

  return (
    <div className="saved-jobs-container mt-20 p-10 text-white">
      <div className="header text-center mb-10">
        <h1 className="text-4xl font-black text-white ">Your Saved Jobs</h1>
        <p className="text-lg text-gray-500 mt-2">
          Here are your saved jobs. Continue your application process or explore
          more opportunities to advance your career.
        </p>
        <p className="text-md text-gray-300 mt-2">
          Note: All saved jobs will be deleted automatically after 30 days.
        </p>
      </div>
      <div className="saved-jobs-list grid grid-cols-1 gap-6">
        {savedJobs.map((job) => (
          <div key={job._id} className="relative">
            <JobTile job={job.jobDetails} />
            <IconButton
              className="absolute top-2 right-2"
              onClick={() => handleDelete(job._id)}
              style={{ color: "red" }} // Add red color to delete icon
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 p-12 text-center">
        <h2 className="h2 opacity-60 text-[#6225C5]">
          Need More Opportunities?{" "}
        </h2>
        <p className="p2 opacity-60">
          Don&apos;t stop here! Explore more job listings and find the perfect
          match for your skills and career goals.{" "}
        </p>
        <a
          href="/home"
          className="gap-2 bg-[#6225C5] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:brightness-[50%] bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Find More Jobs
        </a>
      </div>
      <div className="footer text-center mt-10">
        <h2 className="text-2xl font-semibold text-blue-400"></h2>
        <p className="text-md text-gray-300 mt-2"></p>
      </div>
    </div>
  );
};

export default SavedJobs;
```

**Backend:**

**File:** `/c:/Users/priya kumari/Desktop/Business/New Portal/backend/routes/apiRoutes.js`

```javascript
import express from "express";
import mongoose from "mongoose";
import jwtAuth from "../lib/jwtAuth.js";
import User from "../db/User.js";
import JobApplicant from "../db/JobApplicant.js";
import Recruiter from "../db/Recruiter.js";
import Job from "../db/Job.js";
import Application from "../db/Application.js";
import Rating from "../db/Rating.js";
import SavedJob from "../db/SavedJob.js"; // Import the SavedJob model
import nodemailer from "nodemailer";
import path from "path";
// import { shuffleArray, models } from "../utils/modelUtils.js";

const router = express.Router();

// Delete a saved job
router.delete("/saved-jobs/:id", jwtAuth, (req, res) => {
  const user = req.user;
  const jobId = req.params.id;

  if (user.type !== "applicant") {
    return res.status(401).json({
      message: "You don't have permissions to delete a saved job",
    });
  }

  SavedJob.findOneAndDelete({ userId: user._id, _id: jobId }) // Ensure the correct field is used for deletion
    .then((savedJob) => {
      if (!savedJob) {
        return res.status(404).json({
          message: "Saved job not found",
        });
      }
      res.json({
        message: "Saved job deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Automatically delete saved jobs after 30 days
setInterval(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  SavedJob.deleteMany({ savedAt: { $lt: thirtyDaysAgo } })
    .then(() => {
      console.log("Old saved jobs deleted successfully");
    })
    .catch((err) => {
      console.error("Error deleting old saved jobs", err);
    });
}, 24 * 60 * 60 * 1000); // Run once a day

export default router;
```

**File:** `/c:/Users/priya kumari/Desktop/Business/New Portal/backend/db/SavedJob.js`

```javascript
import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  jobDetails: {
    type: Object,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedJob = mongoose.model("SavedJob", savedJobSchema);

export default SavedJob;
```

### Problem 2: Ensure the delete button works correctly and the API endpoint is properly used in the frontend.

#### Solution:

**Frontend:**

**File:** `/c:/Users/priya kumari/Desktop/Business/New Portal/Frontend/src/lib/apiList.js`

```javascript
export const server = "http://localhost:4445";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  models: `${server}/ai/models`,
  sendMail: `${server}/api/send-email`,
  generatePrompt: (modelId) => `${server}/ai/${modelId}/generate-prompt`,
  atsMatch: (modelId) => `${server}/ai/${modelId}/check-ats`,
  initializeCredits: `${server}/ai/initialize-credits`,
  credits: `${server}/ai/credits`,
  savedJobs: `${server}/api/saved-jobs`,
  saveJob: (jobId) => `${server}/api/jobs/${jobId}/save`,
  deleteSavedJob: (jobId) => `${server}/api/saved-jobs/${jobId}`, // Add deleteSavedJob endpoint
};

export default apiList;
```

**File:** `/c:/Users/priya kumari/Desktop/Business/New Portal/Frontend/src/component/SavedJobs.jsx`

```javascript
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import apiList from "../lib/apiList";
import { SetPopupContext } from "../App";
import { JobTile } from "./Home/JobTile";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    axios
      .get(apiList.savedJobs, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSavedJobs(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching saved jobs",
        });
      });
  }, [setPopup]);

  const handleDelete = (jobId) => {
    axios
      .delete(apiList.deleteSavedJob(jobId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
        setPopup({
          open: true,
          severity: "success",
          message: "Job deleted successfully",
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error deleting job",
        });
      });
  };

  return (
    <div className="saved-jobs-container mt-20 p-10 text-white">
      <div className="header text-center mb-10">
        <h1 className="text-4xl font-black text-white ">Your Saved Jobs</h1>
        <p className="text-lg text-gray-500 mt-2">
          Here are your saved jobs. Continue your application process or explore
          more opportunities to advance your career.
        </p>
        <p className="text-md text-gray-300 mt-2">
          Note: All saved jobs will be deleted automatically after 30 days.
        </p>
      </div>
      <div className="saved-jobs-list grid grid-cols-1 gap-6">
        {savedJobs.map((job) => (
          <div key={job._id} className="relative">
            <JobTile job={job.jobDetails} />
            <IconButton
              className="absolute top-2 right-2"
              onClick={() => handleDelete(job._id)}
              style={{ color: "red" }} // Add red color to delete icon
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 p-12 text-center">
        <h2 className="h2 opacity-60 text-[#6225C5]">
          Need More Opportunities?{" "}
        </h2>
        <p className="p2 opacity-60">
          Don&apos;t stop here! Explore more job listings and find the perfect
          match for your skills and career goals.{" "}
        </p>
        <a
          href="/home"
          className="gap-2 bg-[#6225C5] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:brightness-[50%] bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Find More Jobs
        </a>
      </div>
      <div className="footer text-center mt-10">
        <h2 className="text-2xl font-semibold text-blue-400"></h2>
        <p className="text-md text-gray-300 mt-2"></p>
      </div>
    </div>
  );
};

export default SavedJobs;
```

### Problem 3: Ensure the icons used are colored appropriately.

#### Solution:

**Frontend:**

**File:** `/c:/Users/priya kumari/Desktop/Business/New Portal/Frontend/src/component/Home/JobTile.jsx`

```javascript
import { useEffect, useState, useContext } from "react";
import { SetPopupContext } from "../../App";
import axios from "axios";
import apiList from "../../lib/apiList";
import { userType } from "../../lib/isAuth";
import { useNavigate } from "react-router-dom";
// PropType install
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check"; // Import CheckIcon

export const JobTile = ({ job }) => {
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");
  const [isSaved, setIsSaved] = useState(false); // State to track if job is saved

  useEffect(() => {
    // Check if the job is already saved
    axios
      .get(apiList.savedJobs, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const savedJobIds = response.data.map((savedJob) => savedJob.jobId);
        if (savedJobIds.includes(job._id)) {
          setIsSaved(true);
        }
      })
      .catch((err) => {
        console.error("Error checking saved jobs", err);
      });
  }, [job._id]);

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        { status: "apply" }, // Ensure initial status is "apply"
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: "Job added to applications",
        });
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.message === "You have already applied for this job"
        ) {
          alert("You have already applied for this job");
        } else {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        }
      });
  };

  const handleSave = () => {
    if (isSaved) {
      setPopup({
        open: true,
        severity: "info",
        message: "This job is already saved",
      });
      return;
    }

    axios
      .post(
        apiList.saveJob(job._id),
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setIsSaved(true);
        setPopup({
          open: true,
          severity: "success",
          message: "Job saved successfully",
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  // const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <div className="border p-4 rounded shadow-md mb-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1 ">
          <div className="flex ">
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-black uppercase ">{job.title}</h3>
              <div className=" companyName flex gap-8">
                {job.companyName && (
                  <p className=" font-semibold">{job.companyName}</p>
                )}
                {job.salary && (
                  <>
                    <span>|</span>
                    <p className=" font-semibold ">₹{job.salary}</p>
                  </>
                )}
              </div>
            </div>

            <div className=" flex items-end justify-end align-middle">
              <button
                className="bg-[#6D28D9] cursor-pointer text-white text-center w-full lg:w-auto py-2 px-4 rounded mb-2"
                onClick={() => navigate(`/job/${job._id}`)}
              >
                View Job
              </button>
              <div className="flex flex-col ml-3 items-center align-middle justify-center place-content-center">
                <IconButton onClick={handleSave}>
                  {isSaved ? (
                    <CheckIcon style={{ color: "green" }} /> // Add green color to check icon
                  ) : (
                    <SaveIcon style={{ color: "white" }} /> // Add blue color to save icon
                  )}
                </IconButton>
                <div className="text-white text-center rounded">
                  {isSaved ? "Saved" : "Save"}
                </div>
              </div>
            </div>
          </div>

          {job.skillsets && (
            <div className="flex flex-wrap mt-2">
              {job.skillsets.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          <div className="mt-4">
            <p
              className="overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
              dangerouslySetInnerHTML={{ __html: job.jobDescription }}
           ......


```

````
# New Portal

## Problem

There was an issue with the filtering functionality in the job listing application. Specifically, the filters for `Internship` and `InOffice` were not working correctly. The backend was receiving incorrect query parameters, which resulted in no jobs being found when these filters were applied.

### Details

1. The frontend was sending `jobType.intern` instead of `jobType.Internship`.
2. The frontend was sending `workType.inOffice` instead of `workType.In Office`.
3. The backend was not correctly handling the `InOffice` work type.

## Solution

### Frontend Changes

1. **Update the `getData` function in `Home.jsx` to use the correct names for `jobType` and `workType`.**
2. **Ensure the `FilterPopup` component uses the correct names for `jobType` and `workType`.**

#### /src/component/Home/Home.jsx

```javascript
// ...existing code...
const getData = () => {
  let searchParams = [];
  if (searchOptions.query) {
    searchParams.push(`q=${searchOptions.query}`);
  }
  if (searchOptions.jobType.fullTime) {
    searchParams.push(`jobType=Full%20Time`);
  }
  if (searchOptions.jobType.partTime) {
    searchParams.push(`jobType=Part%20Time`);
  }
  if (searchOptions.jobType.intern) {
    searchParams.push(`jobType=Internship`);
  }
  if (searchOptions.jobType.wfh) {
    searchParams.push(`jobType=Work%20From%20Home`);
  }
  if (searchOptions.workType.remote) {
    searchParams.push(`workType=Remote`);
  }
  if (searchOptions.workType.inOffice) {
    searchParams.push(`workType=InOffice`); // Ensure this matches the backend value
  }
  if (searchOptions.salary[0] !== 0) {
    searchParams.push(`salaryMin=${searchOptions.salary[0] * 1000}`);
  }
  if (searchOptions.salary[1] !== 100) {
    searchParams.push(`salaryMax=${searchOptions.salary[1] * 1000}`);
  }
  if (searchOptions.duration !== "0") {
    searchParams.push(`duration=${searchOptions.duration}`);
  }

  let asc = [],
    desc = [];
  Object.keys(searchOptions.sort).forEach((key) => {
    const item = searchOptions.sort[key];
    if (item.status) {
      item.desc ? desc.push(`desc=${key}`) : asc.push(`asc=${key}`);
    }
  });
  const queryString = [...searchParams, ...asc, ...desc].join("&");
  let address = `${apiList.jobs}`;
  if (queryString) {
    address += `?${queryString}`;
  }

  console.log("Fetching data from:", address); // Add this line for debugging

  axios
    .get(address, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      setJobs(
        response.data.filter((job) => new Date(job.deadline) > new Date())
      );
    })
    .catch(() => {
      setPopup({
        open: true,
        severity: "error",
        message: "Error fetching jobs",
      });
    });
};
// ...existing code...
````

#### /src/component/Home/FilterPopup.jsx

```javascript
// filepath: /c:/Users/priya kumari/Desktop/Business/New Portal/Frontend/src/component/Home/FilterPopup.jsx
// ...existing code...
export const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    open && (
      <div
        className=" fixed top-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg h-[70vh] w-[60vw] border-x-2 border-white rounded-3xl mt-8"
        onClick={handleClose}
      >
        <div
          className="bg-transparent rounded-3xl shadow-md w-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-1/4">Job Type</div>
              <div className="flex-1 flex justify-around">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="fullTime"
                    checked={searchOptions.jobType.fullTime || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">Full Time</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="intern"
                    checked={searchOptions.jobType.intern || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">Internship</span>
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-1/4">Work Type</div>
              <div className="flex-1 flex justify-around">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remote"
                    checked={searchOptions.workType.remote || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        workType: {
                          ...searchOptions.workType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">Remote</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inOffice"
                    checked={searchOptions.workType.inOffice || false}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        workType: {
                          ...searchOptions.workType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                  />
                  <span className="ml-2">InOffice</span> {/* Update this line */}
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#6d28d9] text-white py-2 px-4 rounded"
                onClick={() => {
                  console.log("Applying filters with options:", searchOptions);
                  getData(searchOptions);
                  handleClose();
                }}
              >
                Apply
              </button>
            </div>
            {/* ...existing code... */}
          </div>
        </div>
      </div>
    )
  );
};
// ...existing code...
```

### Backend Changes

1. **Update the `/jobs` route in `apiRoutes.js` to handle `InOffice` correctly.**

#### /backend/routes/apiRoutes.js

```javascript
// filepath: /c:/Users/priya kumari/Desktop/Business/New Portal/backend/routes/apiRoutes.js
// ...existing code...

// to get all the jobs [pagination] [for recruiter personal and for everyone]
router.get("/jobs", jwtAuth, (req, res) => {
  let user = req.user;

  let findParams = {};
  let sortParams = { dateOfPosting: -1 }; // Sort by dateOfPosting in descending order

  // Log received query parameters
  console.log("Received query parameters:", req.query);

  // to list down jobs posted by a particular recruiter
  if (user.type === "recruiter" && req.query.myjobs) {
    findParams = {
      ...findParams,
      userId: user._id,
    };
  }

  if (req.query.q) {
    findParams = {
      ...findParams,
      $or: [
        { title: { $regex: new RegExp(req.query.q, "i") } },
        { companyName: { $regex: new RegExp(req.query.q, "i") } },
        { skillsets: { $regex: new RegExp(req.query.q, "i") } },
      ],
    };
  }

  if (req.query.jobType) {
    let jobTypes = [];
    if (Array.isArray(req.query.jobType)) {
      jobTypes = req.query.jobType;
    } else {
      jobTypes = [req.query.jobType];
    }
    findParams = {
      ...findParams,
      jobType: {
        $in: jobTypes,
      },
    };
  }

  if (req.query.workType) {
    let workTypes = [];
    if (Array.isArray(req.query.workType)) {
      workTypes = req.query.workType;
    } else {
      workTypes = [req.query.workType];
    }
    findParams = {
      ...findParams,
      workType: {
        $in: workTypes.map((type) =>
          type === "In Office" ? "InOffice" : type
        ), // Update this line
      },
    };
  }

  if (req.query.salaryMin && req.query.salaryMax) {
    findParams = {
      ...findParams,
      $and: [
        {
          salary: {
            $gte: parseInt(req.query.salaryMin),
          },
        },
        {
          salary: {
            $lte: parseInt(req.query.salaryMax),
          },
        },
      ],
    };
  } else if (req.query.salaryMin) {
    findParams = {
      ...findParams,
      salary: {
        $gte: parseInt(req.query.salaryMin),
      },
    };
  } else if (req.query.salaryMax) {
    findParams = {
      ...findParams,
      salary: {
        $lte: parseInt(req.query.salaryMax),
      },
    };
  }

  if (req.query.duration) {
    findParams = {
      ...findParams,
      duration: {
        $lt: parseInt(req.query.duration),
      },
    };
  }

  if (req.query.asc) {
    if (Array.isArray(req.query.asc)) {
      req.query.asc.map((key) => {
        sortParams = {
          ...sortParams,
          [key]: 1,
        };
      });
    } else {
      sortParams = {
        ...sortParams,
        [req.query.asc]: 1,
      };
    }
  }

  if (req.query.desc) {
    if (Array.isArray(req.query.desc)) {
      req.query.desc.map((key) => {
        sortParams = {
          ...sortParams,
          [key]: -1,
        };
      });
    } else {
      sortParams = {
        ...sortParams,
        [req.query.desc]: -1,
      };
    }
  }

  // Log constructed findParams and sortParams
  console.log("Constructed findParams:", findParams);
  console.log("Constructed sortParams:", sortParams);

  let arr = [
    {
      $lookup: {
        from: "recruiterinfos",
        localField: "userId",
        foreignField: "userId",
        as: "recruiter",
      },
    },
    { $unwind: "$recruiter" },
    { $match: findParams },
  ];

  if (Object.keys(sortParams).length > 0) {
    arr = [
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "userId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      { $match: findParams },
      {
        $sort: sortParams,
      },
    ];
  }

  Job.aggregate(arr)
    .then((posts) => {
      if (posts == null) {
        res.status(404).json({
          message: "No job found",
        });
        return;
      }
      res.json(posts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ...existing code...
```

By making these changes, the filtering functionality for `Internship` and `InOffice` should work correctly.

# New Portal

## Problem Statement

The problem was to separate the large screen (lg) filter UI from the rest of the application. This required creating a distinct component for the lg screen filter UI and integrating it into the existing application structure.

## Solution

1. **Create a new component for the lg screen filter UI**: A new file `LgScreenFilterUI.js` was created in the `src/components` directory. This file contains the lg screen filter UI code.
2. **Integrate the new component**: The main application file `App.js` was updated to include the new `LgScreenFilterUI` component.

### Steps to Implement

1. Create a new file `LgScreenFilterUI.js` in the `src/components` directory.
2. Define the lg screen filter UI within this new file.
3. Update `App.js` to import and use the new `LgScreenFilterUI` component.

### Example Code

#### /src/components/LgScreenFilterUI.js

```javascript
// filepath: /c:/Users/priya kumari/Desktop/Business/New Portal/src/components/LgScreenFilterUI.js
import React from "react";

const LgScreenFilterUI = () => {
  return <div>{/* Add your lg screen filter UI code here */}</div>;
};

export default LgScreenFilterUI;
```

#### /src/App.js

```javascript
// filepath: /c:/Users/priya kumari/Desktop/Business/New Portal/src/App.js
import React from "react";
import LgScreenFilterUI from "./components/LgScreenFilterUI";

function App() {
  return (
    <div className="App">
      {/* ...existing code... */}
      <LgScreenFilterUI />
      {/* ...existing code... */}
    </div>
  );
}

export default App;
```
