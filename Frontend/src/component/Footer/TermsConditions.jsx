import React from "react";
import {
  FaCheckCircle,
  FaUserShield,
  FaUser,
  FaFileAlt,
  FaEnvelope,
  FaBan,
  FaExclamationTriangle,
  FaShieldAlt,
  FaSyncAlt,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const TermsConditions = () => {
  return (
    <div className="bg-[#02101E] text-cyan-400 min-h-screen mt-14 p-10">
      <div className="max-w-4xl mx-auto shadow-xl shadow-cyan-500/20 border border-cyan-500/50 p-6 rounded-2xl">
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-sm text-cyan-300 text-center">
          Last Modified: February 2025
        </p>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaCheckCircle className="mr-2 text-[#22D3EE]" /> 1. Acceptance of
            Terms
          </h2>
          <p className="text-cyan-300 mt-2">
            By accessing or using Kaaryasteu, you agree to these Terms &
            Conditions and our Privacy Policy. If you do not agree, please
            discontinue use of our services.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaUserShield className="mr-2 text-[#22D3EE]" /> 2. Use of Services
          </h2>
          <p className="text-cyan-300 mt-2">
            Kaaryasteu provides a platform for job seekers to discover
            opportunities, track applications, generate AI-assisted cold emails,
            and request resume reviews. Users must ensure all provided
            information is accurate and lawful.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaUser className="mr-2 text-[#22D3EE]" /> 3. User Accounts
          </h2>
          <p className="text-cyan-300 mt-2">
            To access some features, you must create an account. You are
            responsible for maintaining confidentiality of your login details
            and notifying us of unauthorized access.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaFileAlt className="mr-2 text-[#22D3EE]" /> 4. Content &
            Intellectual Property
          </h2>
          <p className="text-cyan-300 mt-2">
            By using our services, you grant us a limited license to display and
            process content you submit. You confirm you have rights to share any
            content uploaded.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaEnvelope className="mr-2 text-[#22D3EE]" /> 5. Application & Cold
            Email Services
          </h2>
          <p className="text-cyan-300 mt-2">
            Our job application process involves redirecting users to external
            job sites. Cold email services provide AI-generated prompts and HR
            contact details, which users must utilize responsibly.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaBan className="mr-2 text-[#22D3EE]" /> 6. Termination
          </h2>
          <p className="text-cyan-300 mt-2">
            Kaaryasteu may terminate or suspend your access at any time for any
            violation of these terms. Users may also delete their accounts.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaExclamationTriangle className="mr-2 text-[#22D3EE]" /> 7.
            Disclaimer of Warranties
          </h2>
          <p className="text-cyan-300 mt-2">
            Kaaryasteu is provided &quot;as is.&quot; We make no guarantees
            about the accuracy, reliability, or availability of our services.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaShieldAlt className="mr-2 text-[#22D3EE]" /> 8. Limitation of
            Liability
          </h2>
          <p className="text-cyan-300 mt-2">
            We are not responsible for any direct or indirect damages resulting
            from the use of our platform.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaSyncAlt className="mr-2 text-[#22D3EE]" /> 9. Changes to Terms
          </h2>
          <p className="text-cyan-300 mt-2">
            We may update these terms at any time. Continued use of Kaaryasteu
            after modifications constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
            <FaEnvelopeOpenText className="mr-2 text-[#22D3EE]" /> 10. Contact
            Us
          </h2>
          <p className="text-cyan-300 mt-2">
            For any questions or concerns, please contact us at
            admin@kaaryasetu.tech
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
