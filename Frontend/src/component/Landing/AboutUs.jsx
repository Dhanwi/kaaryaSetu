import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const AboutUs = () => {
  return (
    <div className="bg-[#02101E] text-white min-h-screen p-10">
      <div className="max-w-5xl mx-auto text-center mt-16">
        {/* <div className="flex justify-center"> */}
        <h1
          className="text-5xl bg-[#035b6b] bg-opacity-90 text-center align-middle justify-center flex font-extrabold p-4 text-cyan-400"
          style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)" }}
        >
          About Kaaryasteu
        </h1>
        {/* </div> */}

        <p className="text-xl mt-6 text-gray-300">
          Finding the right job shouldn’t be a struggle. At Kaaryasteu, we aim
          to make job hunting effortless, empowering candidates with AI-driven
          tools, personalized guidance, and strategic insights to land their
          dream roles.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl font-semibold text-cyan-400">Our Story</h2>
        <p className="mt-4 text-gray-300">
          Years ago, our journey started just like yours—frustrated with the
          exhausting job search process. Countless applications, endless resume
          revisions, and cold emails that often went unanswered. We realized
          that job seekers needed more than just job listings; they needed a
          structured, data-driven approach to stand out in the crowd.
        </p>
        <p className="mt-4 text-gray-300">
          This led to the birth of Kaaryasteu—a platform designed to simplify
          the application process, provide exclusive AI-powered cold email
          prompts, HR contact details, and a personalized resume review system.
          Our goal is to support job seekers every step of the way, from
          applying to securing their desired job.
        </p>
        <p className="mt-4 text-gray-300">
          Although we are in the early phases, we are committed to helping job
          seekers find their dream jobs by providing them with the right tools
          and guidance. Our team is dedicated to continuously improving our
          platform to meet the evolving needs of job seekers.
        </p>
        <p className="mt-4 text-gray-300">
          For more information, visit our{" "}
          <a href="https://kaaryasetu.tech/" className="text-cyan-400">
            website
          </a>{" "}
          or connect with us on{" "}
          <a
            href="https://www.linkedin.com/company/kaaryasetu/"
            className="text-cyan-400"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>

      {/* Image Section */}
      <div className="max-w-4xl mx-auto mt-10">
        <img
          src="/images/logo/l12.jpg"
          alt="Kaaryasteu Team"
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>

      {/* Meet the Team */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-semibold text-cyan-400">
          Meet the Kaaryasteu Team
        </h2>
        <div className="flex flex-wrap justify-center mt-10 gap-8">
          {/* Founder */}
          <div className="bg-[#020C1B] shadow-black p-6 rounded-lg shadow-xl w-80 text-center">
            <h3 className="text-xl font-semibold text-white">Priya</h3>
            <p className="text-gray-300">Founder | MERN Stack Developer</p>
            <p className="text-gray-400 mt-2">
              I am passionate about empowering job seekers with cutting-edge
              technology. Leading Kaaryasteu with a vision to simplify job
              hunting.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/priya-kumari-8b87a1215/"
                className="text-cyan-400"
              >
                <LinkedInIcon />
              </a>
              <a href="#" className="text-cyan-400">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Co-Founder Sandeep */}
          <div className="bg-[#020C1B] p-6 rounded-lg shadow-xl  shadow-black  w-80 text-center">
            <h3 className="text-xl font-semibold text-white">Sandeep</h3>
            <p className="text-gray-300">Co-Founder | MERN Stack Developer</p>
            <p className="text-gray-400 mt-2">
              As a skilled MERN stack developer, I play a crucial role in
              building the robust infrastructure behind Kaaryasteu.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/sandeep-singh-shekhawat-929784209/"
                className="text-cyan-400"
              >
                <LinkedInIcon />
              </a>
              <a href="#" className="text-cyan-400">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Co-Founder Kuldeep */}
          <div className="bg-[#020C1B] p-6 rounded-lg shadow-xl  shadow-black  w-80 text-center">
            <h3 className="text-xl font-semibold text-white">Kuldeep Jha</h3>
            <p className="text-gray-300">
              Co-Founder | Cybersecurity Specialist
            </p>
            <p className="text-gray-400 mt-2">
              Currently pursuing M.Tech in Cybersecurity, I ensure that
              Kaaryasteu remains secure and reliable for all users.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/kuldeepkrjha/"
                className="text-cyan-400"
              >
                <LinkedInIcon />
              </a>
              <a href="#" className="text-cyan-400">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-semibold text-cyan-400">
          Connect with Us
        </h2>
        <p className="text-gray-300 mt-2">
          Reach out to us for collaborations, support, or career guidance.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://www.linkedin.com/company/kaaryasetu/"
            className="text-cyan-400 text-lg"
          >
            <LinkedInIcon />
          </a>
          <a href="#" className="text-cyan-400 text-lg">
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
