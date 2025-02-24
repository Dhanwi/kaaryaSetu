import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import apiList, { server } from "../../lib/apiList";
import {
  FaCheckCircle,
  FaClipboard,
  FaEnvelope,
  FaRocket,
  FaUpload,
} from "react-icons/fa";

const PersonalizedMail = ({
  resumeFile,
  setResumeFile,
  showModal,
  setShowModal,
  customEmail,
  setCustomEmail,
  emailContent,
  handleCopy,
  copied,
  userEmail,
}) => {
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadPercentage(0);
    setUploadSuccess(false);
  };

  const uploadResume = () => {
    const data = new FormData();
    data.append("file", resumeFile);

    axios
      .post(apiList.uploadResume, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      })
      .then((response) => {
        setResumeFile(response.data.url);
        setUploadSuccess(true);
      })
      .catch((err) => {
        alert("Error uploading resume");
        console.error(err);
      });
  };

  const getResume = () => {
    if (resumeFile) {
      const address = `${server}${resumeFile}`;
      axios
        .get(address, { responseType: "blob" })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch(() => {
          alert("Error fetching resume");
        });
    } else {
      alert("No resume found");
    }
  };

  useEffect(() => {
    if (resumeFile && typeof resumeFile === "string") {
      setUploadPercentage(100);
    }
  }, [resumeFile]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiList.user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.resume) {
          setResumeFile(response.data.resume);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleRequestPersonalizedMail = async () => {
    if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="my-4 p-4 bg-[#02101E]">
      <div className="flex flex-col items-center px-5">
        <div className="text-[#22D3EE] text-4xl font-bold mt-5 text-center mb-5">
          Your Success Matters <FaRocket className="inline ml-2" /> – Let’s
          Perfect Your Resume!
        </div>
        <div className="text-xl font-serif text-[#06B6D4] mt-5 text-center mb-5">
          We’re here to help you stand out with a polished, job-ready resume! To
          ensure you get the best feedback while respecting everyone’s time,
          here’s how it works:
        </div>
        <div className="flex items-center text-center justify-center mt-2 mb-5">
          <div className="flex bg-[#041124] gap-4 flex-col rounded-3xl border border-cyan-500/50 p-4 items-start text-lg font-serif text-white shadow-xl shadow-cyan-500/20">
            <div className="text-start bg-[#020C1B] rounded-2xl border border-cyan-500/50 p-3">
              <FaCheckCircle className="inline mr-2" /> One Free Review Per Week
              – We’ll review your resume once a week, so make sure to request
              only when you’re truly ready.
            </div>
            <div className="text-start bg-[#020C1B] rounded-2xl border border-cyan-500/50 p-3">
              <FaCheckCircle className="inline mr-2" /> Apply, Improve, Then
              Reapply – If changes are suggested, implement them before
              requesting another review. This helps us focus on giving you
              meaningful, next-level feedback!
            </div>
            <div className="text-start bg-[#020C1B] rounded-2xl border border-cyan-500/50 p-3">
              <FaCheckCircle className="inline mr-2" /> Be Clear About Your
              Domain – Instead of submitting the same resume multiple times,
              mention all the fields you’re applying for upfront. This way, we
              can provide comprehensive feedback in one go, saving time for both
              you and us.
            </div>
          </div>
        </div>
        <div className="text-xl font-serif text-[#22D3EE] text-center mb-5">
          <FaRocket className="inline mr-2" /> We’re here to guide you, but your
          growth starts with you! Follow these steps, and together, we’ll craft
          a resume that opens doors.
        </div>
      </div>
      <div className="my-4 mx-5 p-4 rounded-3xl border border-cyan-500/50 hover:border-cyan-700">
        <div>
          <h2 className="text-xl text-[#22D3EE] flex justify-center mt-3 font-bold mb-1">
            Personalized Mail Request
          </h2>
          <div className="flex justify-center text-white text-lg font-serif mb-7">
            Choose your resume, or check the already uploaded resume before
            proceeding
          </div>
          <input
            type="file"
            onChange={handleResumeUpload}
            className="border border-cyan-500/50 hover:bg-[#041124] text-neutral-200 hover:text-white py-4 rounded-2xl px-4 w-full mb-2"
          />
          {resumeFile && uploadPercentage < 100 && (
            <button
              onClick={uploadResume}
              className="bg-green-500 text-white px-4 py-2 mt-2 mr-4 rounded hover:bg-green-700"
            >
              <FaUpload className="inline mr-2" /> Upload Resume
            </button>
          )}
          {resumeFile && uploadPercentage === 100 && (
            <button
              onClick={getResume}
              className="bg-blue-500 text-white px-4 py-2 mt-2 mr-4 rounded-xl hover:bg-blue-700"
            >
              View Your Uploaded Resume
            </button>
          )}
          {uploadSuccess && (
            <div className="text-green-500 mt-2 flex items-center">
              <FaCheckCircle className="w-6 h-6 mr-2" />
              Resume successfully uploaded
            </div>
          )}
        </div>

        <div className="mb-2 text-white font-serif text-md">
          <div className="flex mt-6 justify-center font-semibold">
            How to Request Your Personalized Resume Review
          </div>
          <div className="flex mt-2 mb-5 justify-center text-white text-xl font-serif">
            <FaEnvelope className="inline mr-2" /> Follow these simple steps to
            get expert feedback on your resume:
          </div>
          <div className="flex flex-col mb-9 gap-2 mt-3 rounded-3xl border border-cyan-500/50 p-5 bg-[#041124] text-white shadow-xl shadow-cyan-500/20">
            <div className="flex rounded-2xl bg-[#020C1B] p-3">
              1️⃣ Click the button below (Request Personalized Mail) and check
              your email ID where you want to receive the review.
            </div>
            <div className="flex rounded-2xl bg-[#020C1B] p-3">
              2️⃣ Click <FaClipboard className="inline mr-2" /> "Copy to
              Clipboard" to copy the request template.
            </div>
            <div className="flex rounded-2xl bg-[#020C1B] p-3">
              3️⃣ Paste it into your email draft. If needed, edit the job
              description or add other positions (e.g., Web Development, Data
              Science, App Development, Angular, React, etc.). Just list the
              titles, and we’ll provide a detailed, pointwise review tailored to
              your goals.
            </div>
            <div className="flex rounded-2xl bg-[#020C1B] p-3">
              4️⃣ Copy our email ID and send the request with your resume
              attached.
            </div>
            <div className="flex rounded-2xl bg-[#020C1B] p-3">
              5️⃣ We’ll analyze your resume and send back a personalized
              improvement plan with the best practices to make it stand out.
            </div>
          </div>

          <div className="flex text-[#22D3EE] font-serif text-md">
            <FaRocket className="inline mr-2" /> Important: You can request a
            review once per week. Make sure to implement the suggested changes
            before submitting a second request—this helps us focus on providing
            the best possible feedback for everyone!
          </div>
          <div className="flex justify-center mt-5">
            <div className="flex justify-center border border-cyan-500/50 bg-[#041124] rounded-xl p-3 font-serif text-md shadow-xl shadow-cyan-500/20">
              <div className="flex justify-center rounded p-2 bg-[#020C1B] text-white font-serif text-md">
                <FaCheckCircle className="inline mr-2" /> Ensure your resume is
                uploaded before sending your request.
              </div>
            </div>
          </div>

          <div className="flex justify-center text-[#22D3EE] font-serif mt-5">
            Let’s refine your resume and boost your chances of landing your
            dream job! <FaRocket className="inline ml-2" />
          </div>
        </div>
        <div className="flex justify-center mt-5 mb-3">
          <button
            onClick={handleRequestPersonalizedMail}
            className="bg-purple-500 font-serif border border-cyan-500/50 text-white px-4 py-2 rounded hover:bg-purple-700 shadow-xl shadow-cyan-500/20"
          >
            Request Personalized Mail
          </button>
        </div>

        {showModal && (
          <div className="fixed mt-7 inset-0 flex items-center font-serif justify-center bg-black bg-opacity-50">
            <div className="bg-[#041124] p-6 rounded shadow-lg w-11/12 md:w-1/2 border border-cyan-500/50">
              <h2 className="text-xl font-bold mb-4 text-[#22D3EE]">
                Request Personalized Mail
              </h2>
              <p className="mb-2 text-lg text-white">
                Please copy the information below and send it to{" "}
                <strong>admin@kaaryasetu.tech</strong>.
              </p>
              <div className="flex text-sm mb-2 text-[#06B6D4]">
                {" "}
                Scroll down and check the info, or modify it as per your
                requirement
              </div>
              <textarea
                value={emailContent}
                readOnly
                className="border custom-scrollbar bg-[#020C1B] text-white rounded-lg p-2 w-full h-[36vh] mb-2"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-[#22D3EE]">
                  Your Email (default: {userEmail})
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="Enter your email if different"
                  className="border p-2 w-full bg-[#020C1B] text-white"
                />
              </div>
              <button
                onClick={handleCopy}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PersonalizedMail.propTypes = {
  resumeFile: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setResumeFile: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  customEmail: PropTypes.string.isRequired,
  setCustomEmail: PropTypes.func.isRequired,
  emailContent: PropTypes.string.isRequired,
  handleCopy: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default PersonalizedMail;
