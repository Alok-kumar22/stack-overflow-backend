import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import connectDB from "./config/db.js";
import UserRoutes from "./routes/users.js";
import QuestionRoutes from "./routes/Question.js";
import answerRoutes from "./routes/Answer.js";
import postRouter from "./routes/posts.js";
import cloudinary from "cloudinary";
import serverless from "serverless-http";

const app = express();
const router = express.Router();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// cloudinary.v2.config({
//     cloud_name: "dzf2bn5ws",
//     api_key: "976119987757764",
//     api_secret: "***************************",
// });
// export const instance = new Razorpay({
//     key_id: "rzp_test_sgdK1uHHwrzcFi",
//     key_secret: "X9tCCmCavSYEQ1GhYKFvn75K",
// });

router.use("/user", UserRoutes);
router.use("/questions", QuestionRoutes);
router.use("/answer", answerRoutes);
router.use("/post", postRouter);


// app.listen(5000, () => {
//     console.log("Server run at Port 5000");
// });

router.get("/", (req, res) => {
    res.json({
        message: "Hello, this is the welcome page.",
        path: "/",
    });
});

app.use("/.netlify/functions/index", router);

connectDB();

export const handler = serverless(app);
