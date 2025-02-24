const authKeys = {
  jwtSecretKey: process.env.JWT_SECRET || "your_default_jwt_secret_key",
  // ...other keys if any...
};

export default authKeys;
