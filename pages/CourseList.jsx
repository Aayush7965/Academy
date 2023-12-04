import React, { useState, useEffect } from 'react';
import Link from 'next/link'


const CourseList = ({ searchTerm, filterTerm }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5050/courses`);
        const data = await response.json();
        setCourses(data.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchCourses();
  }, []);

  
  
  useEffect(() => {
    const filtered = courses.filter((course) => {
      let titleMatch = course.title.toLowerCase().includes(searchTerm?.toLowerCase() || '');
      let instructorMatch = course.instructor.toLowerCase().includes(searchTerm?.toLowerCase() || '');
      let statusMatch = course.enrollmentStatus?.toLowerCase() === filterTerm?.toLowerCase() || "";
      if(filterTerm == undefined) {
        statusMatch = true
      }      
      console.log(filterTerm);
      return (titleMatch || instructorMatch) && statusMatch;
    });
    
    setFilteredCourses(filtered);
}, [searchTerm, filterTerm, courses]);
  
  

  return (
    <>
    <div className="container">
      { !searchTerm && <h2>Course Listing</h2>}
      {filteredCourses.map((course) => (
        <div key={course.id}>
        <Link  href={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
              <div key={course.id} className="course-card">
          <div className='courseListImageContainer'>
                <img src={course.image} />
          </div>
          <div className='courseListInformationContainer'>

                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor}</p>
                <p>
                  {course.description}
                </p>
                <p>{course.enrollmentStatus} • {course.courseDuration} • {course.location}</p>
          </div>
        </div>
            </Link>
          </div>
      ))}
    </div>
    </>
  );
};

export default CourseList;
