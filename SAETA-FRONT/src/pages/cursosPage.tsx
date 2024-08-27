import React, { useState, useEffect } from 'react';
import { Course, Enrollment, Client } from '../types';
import { handleCreateCourse, handleDeleteCourse, handleUpdateCourse, handleFetchCourses } from '../handlers/CursosHandlers';
import { handleFetchEnrollments, handleCreateEnrollment, handleDeleteEnrollment } from '../handlers/enrollmentHandlers';
import { getAllClients } from '../api/ClienteAPI';

const CursosPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollmentsByCourse, setEnrollmentsByCourse] = useState<{ [key: string]: Enrollment[] }>({});
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  useEffect(() => {
    handleFetchCourses(setCourses);
    fetchClients();
  }, []);

  useEffect(() => {
    courses.forEach((course) => {
      if (course.id) {
        handleFetchEnrollments(course.id, (fetchedEnrollments) => {
          // Directamente actualiza el estado de los enrollments por curso
          setEnrollmentsByCourse((prevState) => ({
            ...prevState,
            [course.id!]: fetchedEnrollments || [], // Aseguramos que siempre es un array
          }));
        });
      }
    });
  }, [courses]);
    
  

  const fetchClients = async () => {
    const clientsData = await getAllClients();
    setClients(clientsData || []);
  };

  const openUpdateModal = (courseId: string) => {
    const selectedCourse = courses.find(course => course.id === courseId);
    if (selectedCourse) {
      setSelectedCourseId(courseId);
      setCourseName(selectedCourse.courseName ?? '');
      setCourseDescription(selectedCourse.courseDescription ?? '');
      setIsUpdateModalOpen(true);
    }
  };

  const openEnrollModal = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsEnrollModalOpen(true);
  };

  return (
    <div className="container">
      <div className="box has-background-primary-light">
        <div className="has-text-centered">
          <span className="tag is-success is-large">CURSOS</span>
        </div>
        <div className="columns is-centered mt-4">
          <div className="column is-one-third has-text-centered">
            <button
              className="button is-rounded has-background-primary-light has-text-dark"
              onClick={() => setIsCreateModalOpen(true)}
            >
              CREATE COURSE
            </button>
          </div>
          <div className="column is-one-third has-text-centered">
            <button
              className="button is-rounded has-background-primary-light has-text-dark"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              DELETE COURSE
            </button>
          </div>
        </div>
        <div className="columns is-multiline is-centered mt-4">
          {courses.map((course) => (
            <div className="column is-one-third" key={course.id!}>
              <div
                className="box has-background-warning-light has-text-centered is-fullwidth"
                style={{ padding: '20px', borderRadius: '10px' }}
                onClick={() => openUpdateModal(course.id!)}
              >
                <div
                  style={{
                    backgroundColor: '#ffcc00',
                    padding: '10px',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  {course.courseName}
                </div>
                <div
                  style={{
                    backgroundColor: '#ffdd57',
                    padding: '10px',
                    borderRadius: '10px'
                  }}
                >
                  {course.courseDescription}
                  </div>
  {/* Aquí se muestran los enrollments específicos del curso */}
  <div className="enrollments">
    <strong>Enrollments:</strong>
    {enrollmentsByCourse[course.id!] &&
      enrollmentsByCourse[course.id!].map((enrollment: Enrollment) => {
        const client = clients.find(client => client.id === enrollment.clientId);
        return (
          <div key={enrollment.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              {client ? `${client.name} ${client.lastName}` : 'Unknown Client'} - {new Date(enrollment.enrollmentDate).toLocaleDateString()}
            </div>
            <button
              className="button is-danger ml-2"
              onClick={() => handleDeleteEnrollment(enrollment.id!, course.id!, setEnrollmentsByCourse)}
            >
              Delete
            </button>
          </div>
        );
      })}
  </div>
</div>
<button
  className="button is-primary mt-2"
  onClick={() => openEnrollModal(course.id!)}
>
  Add Enrollment
</button>
</div>

          ))}
        </div>
      </div>

      {/* Modal for creating a course */}
      {isCreateModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create New Course</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setIsCreateModalOpen(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Course Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter course name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Course Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Enter course description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={() =>
                  handleCreateCourse(
                    courseName,
                    courseDescription,
                    setCourses,
                    setIsCreateModalOpen,
                    setCourseName,
                    setCourseDescription
                  )
                }
              >
                Save changes
              </button>
              <button
                className="button"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Modal for adding an enrollment */}
      {isEnrollModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Enrollment</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setIsEnrollModalOpen(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Select Client</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={selectedClientId || ''}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a client
                      </option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name} {client.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
            <button
  className="button is-success"
  onClick={() => {
    if (selectedCourseId && selectedClientId) {
      const enrollmentDate = new Date();
      handleCreateEnrollment(
        selectedCourseId,
        selectedClientId,
        enrollmentDate,
        (newEnrollment) => {
          setEnrollmentsByCourse((prevState) => ({
            ...prevState,
            [selectedCourseId]: [
              ...(prevState[selectedCourseId] || []),
              newEnrollment, // Solo se agrega el nuevo enrollment
            ],
          }));
        },
        setIsEnrollModalOpen // Cierra el modal después de agregar la inscripción
      );
    }
  }}
>
  Save Enrollment
</button>





              <button
                className="button"
                onClick={() => setIsEnrollModalOpen(false)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Modal for updating a course */}
      {isUpdateModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Update Course</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setIsUpdateModalOpen(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Course Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter course name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Course Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Enter course description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={() => {
                  if (selectedCourseId) {
                    handleUpdateCourse(
                      selectedCourseId,
                      courseName,
                      courseDescription,
                      courses,
                      setCourses,
                      setIsUpdateModalOpen,
                      setSelectedCourseId,
                      setCourseName,
                      setCourseDescription
                    );
                  } else {
                    console.error('No course selected for update.');
                  }
                }}
              >
                Update Course
              </button>
              <button
                className="button"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Modal for selecting a course to delete */}
      {isDeleteModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Select a Course to Delete</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setIsDeleteModalOpen(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Courses</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={selectedCourseId || ''}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.courseName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-danger"
                onClick={() =>
                  handleDeleteCourse(
                    selectedCourseId,
                    courses,
                    setCourses,
                    setIsDeleteModalOpen,
                    setSelectedCourseId
                  )
                }
              >
                Delete Course
              </button>
              <button
                className="button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursosPage;
