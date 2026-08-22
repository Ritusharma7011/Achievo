//Import all necessary things
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

require("dotenv").config();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

//Port number
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//add middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",  //development(local) frontend URL
      "https://achievo-ed-tech.vercel.app", //production frontend URL
    ],
    credentials: true,
  })
);
app.use(fileUpload({
	useTempFiles : true,
	tempFileDir : "/tmp"
}));

//connect with cloudinary
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

//default route
app.get("/" ,(req,res) => {
	return res.json({
		success : true,
		message : "Your server is up and running...."
	})
});

//listen app
app.listen(PORT, () =>{
	console.log(`App is running at ${PORT}`);
});



