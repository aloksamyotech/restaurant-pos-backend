import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:7200"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "headers",
  ],
  credentials: true,
  preflightContinue: false,
};

const corsConfig = cors(corsOptions);
export default corsConfig;
