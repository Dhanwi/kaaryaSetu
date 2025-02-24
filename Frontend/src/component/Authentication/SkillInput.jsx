import React, { useState } from "react";
import PropType from "prop-types";
import { FaTimes } from "react-icons/fa";

const SkillInput = ({ signupDetails, setSignupDetails }) => {
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (event) => {
    if (event.key === "Enter" && currentSkill.trim() !== "") {
      event.preventDefault();
      setSignupDetails({
        ...signupDetails,
        skills: [...(signupDetails.skills || []), currentSkill.trim()],
      });
      setCurrentSkill("");
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSignupDetails({
      ...signupDetails,
      skills: signupDetails.skills.filter((skill) => skill !== skillToDelete),
    });
  };

  return (
    <div className="flex flex-col bg-[#02101E] p-4 rounded-lg shadow-xl shadow-cyan-500/20">
      <label className="text-sm text-[#22D3EE] font-medium mb-1">Skills</label>
      <div className="flex flex-wrap items-center gap-2 p-2 border border-cyan-500/50 rounded bg-[#041124]">
        {signupDetails.skills &&
          signupDetails.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-[#020C1B] text-[#22D3EE] px-3 py-1 rounded-full cursor-pointer hover:bg-[#041124]"
              onClick={() => handleDeleteSkill(skill)}
            >
              {skill}
              <FaTimes className="ml-2 text-[#06B6D4] font-bold cursor-pointer" />
            </div>
          ))}
        <input
          type="text"
          placeholder="Enter skills and press Enter"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          onKeyDown={handleAddSkill}
          className="flex-grow p-2 border-none focus:outline-none bg-transparent text-[#22D3EE] placeholder-neutral-200 placeholder:text-sm"
        />
      </div>
      <p className="text-xs mb-3 text-gray-400 mt-1">
        Press Enter to add skills. Click on a skill to delete it.
      </p>
    </div>
  );
};

SkillInput.propTypes = {
  signupDetails: PropType.object.isRequired,
  setSignupDetails: PropType.func.isRequired,
};
export default SkillInput;
