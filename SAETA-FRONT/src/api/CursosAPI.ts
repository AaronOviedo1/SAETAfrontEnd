import api from ".";
import { Course } from "../types";

// CREATE COURSE
export const createCourse = async (course: { courseName: string, courseDescription: string }) => {
  try {
      console.log('Sending course data:', course); // Debugging: Log the course data being sent

      const response = await fetch('http://localhost:8080/api/courses', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(course)
      });

      console.log('Response received:', response); // Debugging: Log the response object

      if (!response.ok) {
          const errorText = await response.text(); // Retrieve the error message from the response
          console.error('Response error:', errorText); // Log the error response text
          throw new Error(`Failed to create course: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Course created successfully:', responseData); // Debugging: Log the response data
      return responseData;

  } catch (error) {
      console.error('Error creating course:', error);
      return null;
  }
};


// UPDATE COURSE
export const updateCourse = async (courseId: string, updatedCourse: Partial<Course>) => {
  try {
    console.log('Sending update request:', courseId, updatedCourse);

    const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourse),
    });

    console.log('Response received:', response); // Añade esto para ver la respuesta en la consola

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Failed to update course: ${errorText}`);
    }

    if (response.status === 204) {
      console.log('Update successful, no content returned');
      return null;
    }

    const responseData = await response.json();
    console.log('Response data:', responseData); // Añade esto para ver los datos de respuesta

    return responseData;

  } catch (error) {
    console.error('Error during update:', error);
    throw error;
  }
};


// DELETE COURSE using fetch
// DELETE COURSE using fetch
export const deleteCourse = async (courseId: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText);
      throw new Error(`Failed to delete course: ${errorText}`);
    }

    // Check if there is a response body before parsing
    let responseData = null;
    if (response.status !== 204) { // 204 means "No Content"
      responseData = await response.json();
    }

    return responseData;

  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};


// GET ALL COURSES
export const getAllCourses = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};
