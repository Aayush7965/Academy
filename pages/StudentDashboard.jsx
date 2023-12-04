import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [completionStates, setCompletionStates] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`http://localhost:5050/dashboard`);
        const data = await response.json();
        setCourses(data.data);
        setCompletionStates(Array(data.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching enrolled courses', error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const markAsComplete = async (id, index) => {
    try {
      const response = await fetch(`http://localhost:5050/mark-complete/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: !completionStates[index],
        }),
      });

      if (response.ok) {
        // Update the completion state for the specific course
        setCompletionStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = !prevStates[index];
          return newStates;
        });
      } else {
        console.error('Failed to mark the course as complete. Please try again.');
      }
    } catch (error) {
      console.error('Error marking course as complete', error);
    }
  };

  return (
    <>
      <h2 style={{ paddingLeft: '32px' }}>Student Dashboard</h2>
      <div className="studentDashboardContainer">
        {courses.map((course, index) => (
          <div key={course.id} className="studentDashboardCard">
            <Link href={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
              <div className="studentDashboardImage">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="studentDashboardInformation">
                <h5>{course.title}</h5>
                <p>Instructor: {course.instructor}</p>
              </div>
            </Link>

            <div className="progress" role="progressbar" aria-label="progressbar label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar bg-success" style={{ width: completionStates[index] ? '100%' : '25%' }}></div>
            </div>
            <div className="progressAndButtonContainer">
              <p>{completionStates[index] ? '100% complete' : '25% complete'}</p>
              <button className="btn btn-dark rounded-pill px-3" type="button" onClick={() => markAsComplete(course.id, index)}>
              {completionStates[index] ? 'Completed' : 'Mark as complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentDashboard;