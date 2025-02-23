import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome, FaTimes  } from "react-icons/fa";

/**
 * TeachersCourse.jsx
 * - Fetches a single course by ID
 * - Displays lessons + a 'cancel lesson' feature
 * - Displays a list of PDFs & allows uploading more
 */
const TeachersCourse = () => {
  const { adminname, courseId } = useParams();
  const [lessonDates, setLessonDates] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch course data (lessons + PDFs) on mount
  useEffect(() => {
    fetchCourseData();
    // eslint-disable-next-line
  }, []);

  /**
   * Fetches course data from your existing endpoint:
   *  GET /api/user/get-single-user-current-course?courseId={courseId}
   * Make sure the backend returns something like:
   * {
   *   lessonDates: [...],
   *   pdfs: [ { id, originalFilename, ... }, ... ]
   * }
   */
  const fetchCourseData = async () => {
    try {
      const response = await fetch(
        `http://localhost:2020/api/user/get-single-user-current-course?courseId=${courseId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLessonDates(data.lessonDates || []);
      console.log(data)
      setPdfs(data.materials || []); // or data.materials if your backend returns 'materials'
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  /**
   * Handle file selection from <input type="file" />
   */
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  /**
   * Upload file to your MaterialController endpoint:
   *   PUT /api/materials/{courseId}/materials
   */
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Adjust the URL to match your controller path
      const response = await fetch(
        `http://localhost:2020/api/materials/${courseId}/materials`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error uploading file");
      }

      alert("File uploaded successfully!");
      // Re-fetch the course data to show newly added PDFs
      fetchCourseData();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  /**
   * Cancel a lesson by calling:
   *   DELETE /api/admin/cancel-lesson
   * with JSON body { courseId, lessonId }
   */
  const handleCancelLesson = async (lessonId) => {
    const isConfirmed = window.confirm("Czy na pewno chcesz odwołać tę lekcję?");
    if (!isConfirmed) return;

    try {
      const response = await fetch("http://localhost:2020/api/admin/cancel-lesson", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel lesson");
      }

      // Update local state so the canceled lesson shows as "odwołane"
      setLessonDates((prev) =>
        prev.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, status: "odwołane", link: null } : lesson
        )
      );
    } catch (error) {
      console.error("Error canceling lesson:", error);
    }
  };

  // Deletes the PDF material
  const handleDeletePdf = async (pdfId) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć ten plik PDF?");
    if (!confirmed) return;
  
    try {
      // Make sure the backend endpoint matches your controller:
      // @DeleteMapping("/{courseId}/materials/{materialId}")
      // or /api/materials/{courseId}/materials/{materialId}?deleteFile=true
      const response = await fetch(
        `http://localhost:2020/api/materials/${courseId}/materials/${pdfId}?deleteFile=true`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete PDF");
      }
  
      // Remove the deleted PDF from local state
      setPdfs((prevPdfs) => prevPdfs.filter((p) => p.id !== pdfId));
    } catch (error) {
      console.error("Error deleting PDF:", error);
      alert("Błąd podczas usuwania pliku PDF");
    }
  };


  return (
    <div className="h-screen w-full bg-gray-100 pt-[10vh] overflow-x-hidden px-4 md:px-12">
      {/* Home link */}
      <Link
        to={`/admin/${adminname}`}
        className="absolute top-6 left-6 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        <FaHome className="w-6 h-6 text-neonblue z-50" />
      </Link>

      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-lg z-0"
        style={{ backgroundImage: "url('/images/background-main.png')" }}
      ></div>
      <div className="absolute inset-0 bg-black bg-cover opacity-10 bg-center filter blur-lg h-full z-0"></div>

      {/* Header Section */}
      <div className="bg-neonblue text-white text-center sm:text-left rounded-3xl py-6 w-full max-w-[1000px] mx-auto px-4 z-40 relative">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Przygotowanie do matury
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row px-4 sm:px-10 py-8 gap-6 w-full max-w-[1000px] mx-auto z-40 relative">
        <div className="flex-1">
          {/* Meeting dates */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Terminy spotkań</h2>
            {lessonDates.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lessonDates.map((lesson, index) => (
                  <li
                    key={index}
                    className={`p-4 rounded-lg shadow-md flex flex-col items-center ${
                      lesson.status === "odwołane"
                        ? "bg-red-100 border border-red-500"
                        : "bg-gray-100"
                    }`}
                  >
                    <span className="text-lg font-medium">
                      {new Date(lesson.lessonDate).toLocaleString()}
                    </span>
                    <p className="text-sm text-gray-600">Status: {lesson.status}</p>

                    {/* If lesson is canceled, show a message & hide the cancel button */}
                    {lesson.status === "odwołane" ? (
                      <p className="text-md font-medium text-red-700 text-center mt-2">
                        Twoje zajęcia zostały odwołane.
                      </p>
                    ) : (
                      <button
                        onClick={() => handleCancelLesson(lesson.id)}
                        className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Odwołaj
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Brak zaplanowanych lekcji.</p>
            )}
          </div>

          {/* PDF materials */}
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Materiały PDF</h2>
            {pdfs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pdfs.map((pdf, index) => {
                  const downloadUrl = `http://localhost:2020/api/materials/materials/${pdf.id}/download`;
                  return (
                    <div
                      key={index}
                      className="relative flex flex-col bg-gray-50 p-4 rounded shadow hover:shadow-md transition"
                    >
                      {/* "Delete" cross in top-right corner */}
                      <button
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        onClick={() => handleDeletePdf(pdf.id)}
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>

                      {/* PDF Icon + Download Link */}
                      <div className="flex items-center">
                        <img
                          src="https://img.icons8.com/color/48/000000/pdf.png"
                          alt="PDF Icon"
                          className="w-8 h-8 mr-3"
                        />
                        <a
                          href={downloadUrl}
                          download
                          className="text-blue-600 hover:text-blue-800 font-medium break-words"
                        >
                          {(pdf.filename.length > 15) ? pdf.filename.slice(0, 15) + "..." : pdf.filename}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">Brak dostępnych materiałów.</p>
            )}
          </div>

          {/* File Upload */}
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dodaj nowy materiał PDF</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              />
              <button
                onClick={handleFileUpload}
                className="bg-neonblue text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Wyślij
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersCourse;
