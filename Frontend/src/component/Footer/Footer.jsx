import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#041124] text-gray-300 py-10 px-5 border-t border-cyan-500/30">
      <div className="w-full px-20 flex gap-8">
        <div className="w-full md:w-1/4 items-start flex justify-start">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400">Kaaryasteu</h2>
            <p className="mt-2 text-sm">
              Your one-stop job search platform with AI-powered tools for resume
              review, cold mailing, and expert guidance to help you land your
              dream job.
            </p>
          </div>
        </div>
        <div className="w-full md:w-3/4 gap-10 items-end flex md:flex-row flex-col justify-end">
          {/* Services Section */}
          <div>
            <h2 className="text-lg font-semibold text-cyan-400">Explore</h2>
            <ul className="mt-2 space-y-2">
              <li>🔹 Job Search & Applications</li>
              <li>🔹 Cold Mailing & HR Contacts</li>
              <li>🔹 AI Resume Review & Optimization</li>
              <li>🔹 Interview Prep & Guidance</li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-lg font-semibold text-cyan-400">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.linkedin.com/company/kaaryasetu/"
                className="hover:text-cyan-400"
              >
                <FaLinkedin className="text-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20" />
              </a>
              <a href="#" className="hover:text-cyan-400">
                <FaTwitter className="text-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20" />
              </a>
            </div>
            <h2 className="text-lg font-semibold text-cyan-400 mt-4">
              Contact Support
            </h2>
            <button
              className="mt-2 bg-cyan-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 flex items-center"
              onClick={() =>
                (window.location.href = "mailto:admin@kaaryasetu.tech")
              }
            >
              <FaEnvelope className="mr-2" /> Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Legal Section */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-cyan-500/20 pt-4">
        Kaaryasteu © {new Date().getFullYear()} | All rights reserved
        <div className="mt-2 space-x-4">
          <a href="/privacypolicy" className="hover:text-cyan-400">
            Privacy Policy
          </a>
          <a href="/termsconditions" className="hover:text-cyan-400">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
