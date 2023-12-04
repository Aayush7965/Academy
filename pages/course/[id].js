import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CourseDetail = () => {
  const [isJoined, setIsJoined] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);

  const handleJoinClick = async () => {
    try {
      const response = await fetch(`http://localhost:5050/course/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isJoined: !isJoined, // Toggle the isJoined value
        }),
      });
  
      if (response.ok) {
        console.log('Success sending the data');
        // Update the local state with the toggled value
        setIsJoined((prevIsJoined) => !prevIsJoined);
      } else {
        console.error('Failed to join the course. Please try again.');
      }
    } catch (error) {
      console.error('Error joining the course:', error);
    }
  };


useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5050/course/${id}`);
        const data = await response.json();
        setCourse(data);
        setIsJoined(data.isJoined);

      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }


  const sortedSyllabus = Object.entries(course.syllabus).sort(([keyA], [keyB]) => {
    const weekNumberA = parseInt(keyA.match(/\d+/)[0], 10);
    const weekNumberB = parseInt(keyB.match(/\d+/)[0], 10);
    return weekNumberA - weekNumberB;
});

  return (
    <div className="container course-details">
      <div className='titleAndButtonContainer'>
        <h2>{course.title}</h2>
        <button
        className="btn btn-dark rounded-pill px-3"
        type="button"
        onClick={handleJoinClick}
        style={isJoined ? {backgroundColor: "gray"} : {backgroundColor: "green"}} 
      >
        {isJoined ? 'Joined' : 'Join'}
      </button>
      </div>
    <p>{course.instructor}</p>
    <p>
      {course.description}
    </p>
    <p>Enrollment Status: {course.enrollmentStatus}</p>
    <p>Duration: {course.courseDuration}</p>
    <p>Schedule: {course.schedule}</p>
    <p>Location: {course.location}</p>
    <p>
    Prerequisites: {course.prerequisites.map((data, i) => (
              <span key={i}>{data} </span>
            ))}
    </p>
    <details>
      <summary>Syllabus</summary>
      <ul>
      {sortedSyllabus.map(([key, value]) => {
          const weekNumber = key.match(/\d+/)[0];
          return (
            <li key={key}>
              Week {weekNumber}: {value}
            </li>
          );
        })}
        
      </ul>
    </details>
  </div>
  );
};

export default CourseDetail;
