import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#041124] text-gray-300 py-10 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* About Section */}
        <div className="w-full lg:w-1/4 text-center lg:text-start">
          <h2 className="text-xl font-semibold text-cyan-400">Kaaryasteu</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your one-stop job search platform with AI-powered tools for resume
            review, cold mailing, and expert guidance to help you land your
            dream job.
          </p>
        </div>

        {/* Services and Contact Section */}
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-8 lg:gap-10 justify-end">
          {/* Services Section */}
          <div className="text-center lg:text-start">
            <h2 className="text-lg font-semibold text-cyan-400">Explore</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              <li>🔹 Job Search & Applications</li>
              <li>🔹 Cold Mailing & HR Contacts</li>
              <li>🔹 AI Resume Review & Optimization</li>
              <li>🔹 Interview Prep & Guidance</li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="text-center lg:text-start">
            <h2 className="text-lg font-semibold text-cyan-400">Follow Us</h2>
            <div className="flex space-x-4 mt-2 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/company/kaaryasetu/"
                className="hover:text-cyan-400"
              >
                <FaLinkedin className="text-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 text-xl" />
              </a>
              <a href="#" className="hover:text-cyan-400">
                <FaTwitter className="text-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 text-xl" />
              </a>
            </div>
            <h2 className="text-lg font-semibold text-cyan-400 mt-4">
              Contact Support
            </h2>
            <button
              className="mt-2 bg-cyan-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-cyan-500 flex items-center justify-center mx-auto lg:mx-0"
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
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-cyan-500/20 pt-4 max-w-7xl mx-auto">
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
