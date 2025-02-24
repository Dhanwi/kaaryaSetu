import React from "react";

const Payment = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold mb-8">Pricing</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="border p-6 rounded-lg shadow-md w-80">
          <h3 className="text-xl font-bold mb-4">Free User</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Access to job listings</li>
            <li>Apply to jobs</li>
            <li>View application status</li>
          </ul>
          <p className="text-red-500">Limited features</p>
        </div>
        <div className="border p-6 rounded-lg shadow-md w-80">
          <h3 className="text-xl font-bold mb-4">Paid User</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Cold Mail HR</li>
            <li>Generate AI prompt for cold mail</li>
            <li>HR contact details provided</li>
            <li>Resume ATS checker</li>
            <li>Suggestions for missing keywords</li>
            <li>10 referrals</li>
          </ul>
          <p className="text-green-500">All features unlocked</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Make Payment
          </button>
        </div>
      </div>
      <div className="mt-8 p-6 border rounded-lg shadow-md w-80">
        <h3 className="text-xl font-bold mb-4">Increase Referral Limit</h3>
        <p>Pay just ₹10 to increase your referral limit.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Increase Limit
        </button>
      </div>
    </div>
  );
};

export default Payment;
