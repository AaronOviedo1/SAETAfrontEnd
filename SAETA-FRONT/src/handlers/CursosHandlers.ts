// src/api/CursosHandlers.ts
import { Course } from '../types';
import { getAllCourses as fetchAllCourses, createCourse, updateCourse, deleteCourse } from '../api/CursosAPI';

export const handleCreateCourse = async (
  courseName: string,
  courseDescription: string,
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCourseName: React.Dispatch<React.SetStateAction<string>>,
  setCourseDescription: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!courseName || !courseDescription) {
    console.error('Both course name and description are required.');
    return;
  }

  const newCourse: Course = {
    courseName,
    courseDescription,
  };

  console.log('Creating course:', newCourse);
  const createdCourse = await createCourse(newCourse);

  if (createdCourse && createdCourse.id) {
    setCourses(prevCourses => [...prevCourses, createdCourse]);
    setIsCreateModalOpen(false);
    setCourseName('');
    setCourseDescription('');
  } else {
    console.error('Failed to create the course.');
  }
  console.log('Created course:', createdCourse);
};

export const handleDeleteCourse = async (
  selectedCourseId: string | null,
  courses: Course[],
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCourseId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (selectedCourseId) {
    console.log('Deleting course with ID:', selectedCourseId);
    try {
      const deletedCourse = await deleteCourse(selectedCourseId);
      if (deletedCourse || deletedCourse === null) {
        setCourses(courses.filter((course) => course.id !== selectedCourseId));
        setIsDeleteModalOpen(false);
        setSelectedCourseId(null);
        console.log('Course deleted successfully and UI updated.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }
};

export const handleUpdateCourse = async (
  selectedCourseId: string | null,
  courseName: string,
  courseDescription: string,
  courses: Course[],
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedCourseId: React.Dispatch<React.SetStateAction<string | null>>,
  setCourseName: React.Dispatch<React.SetStateAction<string>>,
  setCourseDescription: React.Dispatch<React.SetStateAction<string>>
) => {
  if (selectedCourseId && courseName && courseDescription) {
    console.log('Updating course with ID:', selectedCourseId);
    try {
      const updatedCourse = await updateCourse(selectedCourseId, { courseName, courseDescription });
      if (updatedCourse || updatedCourse === null) {
        setCourses(courses.map(course =>
          course.id === selectedCourseId ? { ...course, courseName, courseDescription } : course
        ));
        setIsUpdateModalOpen(false);
        setSelectedCourseId(null);
        setCourseName('');
        setCourseDescription('');
        console.log('Course updated successfully and UI updated.');
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  }
};


export const handleFetchCourses = async (
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>
) => {
  try {
    const courses = await fetchAllCourses();
    setCourses(courses || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};
