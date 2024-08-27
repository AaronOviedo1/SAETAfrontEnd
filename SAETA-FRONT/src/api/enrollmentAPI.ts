// src/api/EnrollmentAPI.ts
import api from '.';
import { Enrollment } from '../types';

export const getEnrollmentsByCourse = async (courseId: string): Promise<Enrollment[] | undefined> => {
    try {
        const res = await api.get(`http://localhost:8080/api/enrollment/course/${courseId}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching enrollments:", err);
        return undefined;
    }
};


// enrollmentAPI.ts
export const createEnrollment = async (clientId: string, courseId: string, enrollmentDate: Date): Promise<any> => {
    try {
      console.log('Sending request to create enrollment:', { clientId, courseId, enrollmentDate }); // Log para verificar los datos
      const response = await fetch('http://localhost:8080/api/enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          courseId,
          enrollmentDate,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create enrollment');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating enrollment:', error);
      throw error;
    }
  };
  
  export const deleteEnrollment = async (enrollmentId: string): Promise<void> => {
    try {
      await api.delete(`http://localhost:8080/api/enrollment/${enrollmentId}`);
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      throw error; // Lanza el error para manejarlo en la llamada
    }
  };