import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  // add your firebase config 
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Get a reference to a specific path in the database
const dataRef = ref(database, '/courses');

let courses
// Listen for changes in the database
onValue(dataRef, (snapshot) => {
  courses = snapshot.val();
}, {
  onlyOnce: false, 
});


const app = express();
const port = 5050;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());



app.get("/course/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  res.status(200).json({ id: courses[courseId - 1].id,  courseDuration: courses[courseId - 1].courseDuration,
  description: courses[courseId - 1].description,
  enrollmentStatus: courses[courseId - 1].enrollmentStatus,
  image: courses[courseId - 1].image,
  instructor: courses[courseId - 1].instructor,
  location: courses[courseId - 1].location,
  prerequisites: courses[courseId - 1].prerequisites,
  schedule: courses[courseId - 1].schedule.time,
  title: courses[courseId - 1].title,
  syllabus: courses[courseId - 1].syllabus,
  isJoined: courses[courseId - 1].isJoined
})
});

app.patch('/course/:id', (req, res) => {
  const courseId = req.params.id;
  const isJoined = req.body.isJoined;
  set(ref(database, `/courses/${courseId - 1}/isJoined`), isJoined);

  res.status(200).json({ success: true });
});


app.get("/courses", (req, res) => {  
  res.status(200).json({ data: courses})
});

app.get("/dashboard", (req, res) => {
  let filteredData = courses.filter((course) => {
    return course.isJoined == true
  })
  res.status(200).json({ data: filteredData})
})

app.patch("/mark-complete/:id", (req, res) => {
  const courseId = req.params.id;
  const isCompleted = req.body.isCompleted;
  set(ref(database, `/courses/${courseId - 1}/isComplete`), isCompleted);

  res.status(200).json({ isComplete: courses[courseId - 1].isComplete })
})

app.listen(port, () => {
  console.log(`Express API is running on http://localhost:${port}`);
});
