const express = require('express');
const cors = require('cors');
const app = express();
const DBConnection = require('./config/database.config');
const academicRouter = require('./routers/academic.routers'); 
const adminRouter = require('./routers/admin.routers'); 
const aichatRouter = require('./routers/aichat.routers'); 
const attendanceRouter = require('./routers/attendance.routers'); 
const collegeRouter = require('./routers/college.routers'); 
const eventsRouter = require('./routers/events.routers'); 
const personalchatRouter = require('./routers/personalchat.routers'); 
const resultRouter = require('./routers/result.routers'); 
const studentRouter = require('./routers/student.routers'); 
const subjectRouter = require('./routers/subject.routers'); 
const teacherRouter = require('./routers/teacher.routers'); 
const timetableRouter = require('./routers/timetable.routers'); 
const uploadRouter = require('./routers/upload.routers'); 
const {protectAny} = require('./middlewares/central.auth.middlewares'); 

require('dotenv').config();
DBConnection();

const PORT = process.env.PORT;

app.use(cors({
  origin: ['http://localhost:5173']
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/" , (req,res) => {
  res.status(200).send("Welcome to AI Integrated ERP Management System.");
});

app.use("/academic" , protectAny,academicRouter);
app.use("/admin" , adminRouter);
app.use("/aichat" , protectAny,aichatRouter);
app.use("/attendance" , protectAny,attendanceRouter);
app.use("/college" , protectAny,collegeRouter);
app.use("/events" , protectAny,eventsRouter);
app.use("/personalchat" , protectAny,personalchatRouter);
app.use("/result" , protectAny,resultRouter);
app.use("/student" , studentRouter);
app.use("/subject" , protectAny,subjectRouter);
app.use("/teacher" , teacherRouter);
app.use("/timetable" , protectAny,timetableRouter);
app.use("/upload" , protectAny,uploadRouter);





app.listen(PORT , ()=> {
  console.log(`Server is started at: http://localhost:${PORT}`);
});

