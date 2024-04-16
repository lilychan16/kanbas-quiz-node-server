import "dotenv/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
const DB_NAME = process.env.DB_NAME;
mongoose.connect(CONNECTION_STRING, {dbName: DB_NAME});

const app = express();
app.use(
  cors({
    // support cookies
    credentials: true,
    // restrict cross origin resource sharing to the react application
    origin: process.env.FRONTEND_URL,
  })
);
// make sure this statement occurs AFTER setting up CORS
app.use(express.json());
// configure server session after cors
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: "https://kanbas-node-server-app-a6-b718.onrender.com"
  };
}
app.use(session(sessionOptions));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
