import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import taskmanager from "./routes/routes.js";

// Path configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 2008;

// Middleware
app.use(cors());

app.use(cors({ origin: ["https://buddy-5ext.onrender.onrender.com"], credentials: true }));

app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use("/taskmanager", taskmanager);

// Serve Static Files (React Frontend)
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
