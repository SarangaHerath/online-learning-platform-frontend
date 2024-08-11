import React, { useState, useEffect } from 'react';
import { fetchCourses, deleteCourse } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      const { data } = await fetchCourses();
      setCourses(data);
    };
    getCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem('token');  // Retrieve the token from localStorage
        if (!token) {
            console.error('No token found');
            return;
        }
        
        await deleteCourse(id, token);  // Pass the token to the deleteCourse API call
        setCourses(courses.filter(course => course._id !== id)); // Remove the deleted course from state
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('User not authorized');
            alert('You are not authorized to delete this course.');
        } else {
            console.error('Failed to delete course:', error);
        }
    }
};

  const handleUpdate = (id) => {
    navigate(`/courses/update/${id}`); // Navigate to the update page for the course
  };

  const handleView = (id) => {
    navigate(`/courses/view/${id}`); // Navigate to the view page for the course
  };

  const handleCreate = () => {
    navigate('/courses/create'); // Navigate to the create course page
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Courses</h2>
        <button 
          onClick={handleCreate} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Create Course
        </button>
      </div>
      <ul className="space-y-4">
        {courses.map(course => (
          <li key={course._id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p className="text-sm text-gray-600">Instructor: {course.instructor.username}</p>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => handleView(course._id)} 
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                View
              </button>
              <button 
                onClick={() => handleUpdate(course._id)} 
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                Update
              </button>
              <button 
                onClick={() => handleDelete(course._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
