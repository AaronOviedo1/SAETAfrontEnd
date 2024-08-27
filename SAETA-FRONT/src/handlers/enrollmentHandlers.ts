// src/handlers/EnrollmentHandlers.ts
import { createEnrollment, getEnrollmentsByCourse, deleteEnrollment } from '../api/enrollmentAPI';
import { Enrollment } from '../types';

// Asegúrate de que `handleFetchEnrollments` acepte una función de tipo correcto.
export const handleFetchEnrollments = async (
    courseId: string,
    setEnrollments: (enrollments: Enrollment[]) => void // Cambio de tipo aquí
  ) => {
    try {
      const enrollments = await getEnrollmentsByCourse(courseId);
      setEnrollments(enrollments || []);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setEnrollments([]); // Asegúrate de que se manejen errores devolviendo un array vacío.
    }
  };
  
  

  export const handleCreateEnrollment = async (
    selectedCourseId: string,
    selectedClientId: string,
    enrollmentDate: Date,
    updateEnrollments: (newEnrollment: Enrollment) => void, // Cambia aquí el tipo
    setIsEnrollModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const newEnrollment = await createEnrollment(selectedClientId, selectedCourseId, enrollmentDate);
      updateEnrollments(newEnrollment); // Actualiza la lista de inscripciones con la nueva
      setIsEnrollModalOpen(false); // Cierra el modal después de agregar la inscripción
    } catch (error) {
      console.error('Error creating enrollment:', error);
    }
  };
  
  export const handleDeleteEnrollment = async (
    enrollmentId: string,
    courseId: string,
    setEnrollmentsByCourse: React.Dispatch<React.SetStateAction<{ [key: string]: Enrollment[] }>>
  ) => {
    try {
      await deleteEnrollment(enrollmentId);
      setEnrollmentsByCourse((prevState) => ({
        ...prevState,
        [courseId]: prevState[courseId].filter(enrollment => enrollment.id !== enrollmentId),
      }));
    } catch (error) {
      console.error('Error deleting enrollment:', error);
    }
  };
  
  