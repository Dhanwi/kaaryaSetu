export const server = import.meta.env.VITE_API_URL;

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
  deleteSavedJob: (jobId) => `${server}/api/saved-jobs/${jobId}`,
  googleLogin: `${server}/auth/google`,
  googleSignup: `${server}/auth/google`,
  sendOtp: `${server}/api/send-otp`,
  verifyOtp: `${server}/api/verify-otp`,
  resetPassword: `${server}/api/reset-password`,
  updatePassword: `${server}/api/update-password`,
};

export default apiList;
