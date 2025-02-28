import React from "react";
import PropTypes from "prop-types";
import {
  FaRocket,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaStepForward,
} from "react-icons/fa";

const HRInfo = ({ jobDetails }) => {
  return (
    <div className="my-4 p-4 bg-[#02101E]">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center text-3xl font-bold text-[#22D3EE]">
          <FaRocket className="mr-2" /> Your Competitive Edge Starts Here!
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex justify-center bg-[#041124] rounded-lg p-3 font-serif text-[#06B6D4] border border-cyan-500/50">
            You&apos;ve crafted the perfect AI-powered cold mail or copied a
            high-converting prompt—now what? Most job seekers stop after hitting
            &quot;Apply&quot;, but you won’t, because you&apos;re on Kaaryasetu!
          </div>
        </div>

        <div className="flex justify-center text-[#22D3EE]">
          Here’s what makes you stand out:
        </div>
        <div className="flex gap-5">
          <div className="flex justify-center bg-[#041124] rounded-lg p-3 font-serif text-[#06B6D4] border border-cyan-500/50">
            <FaEnvelope className="mr-2" /> Direct Access to HR Details – No
            more blind applications! Get verified HR emails and LinkedIn
            profiles instantly.
          </div>
          <div className="flex justify-center bg-[#041124] rounded-lg p-3 font-serif text-[#0891B2] border border-cyan-500/50">
            <FaLinkedin className="mr-2" /> Personalized Outreach – Send
            tailored emails or LinkedIn messages directly to recruiters,
            increasing your chances of getting noticed.
          </div>
          <div className="flex justify-center bg-[#041124] rounded-lg p-3 font-serif text-[#06B6D4] border border-cyan-500/50">
            <FaStepForward className="mr-2" /> Be Ahead of the Competition –
            While others stop at submitting resumes, you’ll take the extra step
            that truly makes a difference in landing interviews.
          </div>
        </div>
        <div className="flex justify-center bg-[#041124] rounded-lg p-3 font-serif text-[#22D3EE] border border-cyan-500/50">
          With Kaaryasetu, you&apos;re not just another applicant—you’re a smart,
          proactive job seeker ready to secure your dream role.
        </div>
        <div className="flex justify-center text-[#06B6D4]">
          Leverage this advantage today and let opportunities come to you!
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mt-8 justify-center flex mb-2">
          <div className="text-xl bg-[#020C1B] p-4 rounded-lg font-bold text-[#22D3EE] border border-cyan-500/50">
            HR Contact Information
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {jobDetails.hrDetails.map((hrDetail, index) => (
            <div
              key={index}
              className="p-4 bg-[#041124] rounded-lg shadow-xl shadow-cyan-500/20 border border-cyan-500/50 w-80"
            >
              {hrDetail.hrInfo && (
                <>
                  <div className="font-bold text-[#22D3EE] mb-2">HR Info:</div>
                  <textarea
                    value={hrDetail.hrInfo}
                    readOnly
                    className="custom-scrollbar w-full bg-transparent border-none text-[#22D3EE] mb-4"
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </>
              )}
              {hrDetail.hrMail && (
                <>
                  <div className="font-bold text-[#22D3EE] mb-2">Email:</div>
                  <p className="text-[#06B6D4] mb-4">{hrDetail.hrMail}</p>
                </>
              )}
              {hrDetail.hrContactNumber && (
                <>
                  <div className="font-bold text-[#22D3EE] mb-2">
                    Contact Number:
                  </div>
                  <p className="text-[#06B6D4]">{hrDetail.hrContactNumber}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex mx-20 flex-col justify-center items-center mt-6 text-[#22D3EE]">
        Your Next Step: Make the First Move! <FaRocket className="ml-2" />
        <div className="flex flex-col w-[50vw] gap-5 mt-4 bg-[#020C1B] p-4 rounded-lg border border-cyan-500/50">
          <div className="flex gap-4">
            <div className="flex bg-[#041124] p-4 rounded-lg text-[#06B6D4] border border-cyan-500/50">
              You’re now one step ahead with direct HR contact details—don’t
              just wait, take action!
            </div>
            <div className="flex bg-[#041124] p-4 rounded-lg text-[#0891B2] border border-cyan-500/50">
              <FaLinkedin className="mr-2" /> Send a cold email or connect on
              LinkedIn—your dream job could be just one message away.
            </div>
          </div>
          <div className="flex bg-[#041124] p-4 rounded-lg text-[#06B6D4] border border-cyan-500/50">
            Remember, you’re not alone in this journey! Kaaryasetu is more than
            just a platform—it’s your career partner, here to support and guide
            you every step of the way.
          </div>
        </div>
        <div className="flex bg-[#041124] mt-5 p-4 rounded-lg text-[#22D3EE] border border-cyan-500/50">
          So go ahead, take that bold step! And if you ever need help, we’re
          always here for you. 💙
        </div>
      </div>
    </div>
  );
};

HRInfo.propTypes = {
  jobDetails: PropTypes.object.isRequired,
};

export default HRInfo;
