import React from "react";
import {
  FaUser,
  FaChartLine,
  FaShieldAlt,
  FaUserShield,
  FaSyncAlt,
  FaDatabase,
  FaPhone,
  FaShareAlt, // Add this import
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#02101E] mt-14 text-gray-300 min-h-screen py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-[#041124] shadow-xl shadow-cyan-500/20 border border-cyan-500/50 p-8 rounded-lg">
        <h1 className="text-cyan-400 text-3xl font-bold text-center mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm text-center mb-4">
          Last Modified: February 2025
        </p>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaUser className="inline-block mr-2" /> 1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 text-gray-300">
            <li>
              <strong>Account Information:</strong> Name, email, contact
              details, bio, education, and skills provided during signup.
            </li>
            <li>
              <strong>Application Data:</strong> When users apply for jobs
              through external links, we store tracking details related to their
              application.
            </li>
            <li>
              <strong>Cold Email & AI Feature:</strong> Data regarding
              AI-generated cold emails, HR contact info, and mail interactions.
            </li>
            <li>
              <strong>Resume Upload:</strong> Users voluntarily provide resumes
              for personalized feedback.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect browsing patterns, clicks,
              and interaction logs for analytics and platform improvement.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaChartLine className="inline-block mr-2" /> 2. How We Use Your
            Information
          </h2>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Providing and improving job search functionalities.</li>
            <li>Enhancing the cold email feature and AI-generated prompts.</li>
            <li>Offering resume review and application tracking features.</li>
            <li>Analyzing user behavior for better UX and security.</li>
            <li>
              Sending platform updates, recommendations, and notifications.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaShareAlt className="inline-block mr-2" /> 3. Data Sharing &
            Third-Party Services
          </h2>
          <p className="text-gray-300">
            We do not sell or rent your personal data. However, we may share
            data with:
          </p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>
              Service providers that help improve our platform (analytics, AI
              processing, etc.).
            </li>
            <li>
              Legal authorities if required by law or to protect user security.
            </li>
            <li>
              Job portals and external platforms when users voluntarily apply
              for jobs via external links.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaShieldAlt className="inline-block mr-2" /> 4. Data Security
          </h2>
          <p className="text-gray-300">
            We implement industry-standard security measures, including
            encryption and secure access, to protect your data. However, no
            method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaUserShield className="inline-block mr-2" /> 5. Your Rights
          </h2>
          <p className="text-gray-300">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-300">
            <li>Access, update, or delete your personal data.</li>
            <li>Request data portability and restrict processing.</li>
            <li>Opt-out of marketing communications.</li>
          </ul>
          <p className="text-gray-300 mt-2">
            For any privacy-related requests, contact us at{" "}
            <span className="text-cyan-400">admin@kaaryasetu.tech</span>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaDatabase className="inline-block mr-2" /> 6. Data Retention
          </h2>
          <p className="text-gray-300">
            We retain user data as long as necessary to provide services. If you
            request deletion, we will securely remove your data unless legal
            obligations require otherwise.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaSyncAlt className="inline-block mr-2" /> 7. Changes to This
            Policy
          </h2>
          <p className="text-gray-300">
            We may update this privacy policy periodically. Users will be
            notified of significant changes via email or in-app notifications.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-cyan-400 text-xl font-semibold mb-2">
            <FaPhone className="inline-block mr-2" /> 8. Contact Us
          </h2>
          <p className="text-gray-300">
            For privacy-related inquiries, contact{" "}
            <span className="text-cyan-400">admin@kaaryasetu.tech</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
