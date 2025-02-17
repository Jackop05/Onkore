import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const TeachersCourse = () => {
  const { adminname, courseId } = useParams();
  const [lessonDates, setLessonDates] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {

    try {
      const response = await fetch(`http://localhost:2020/api/user/get-single-user-current-course?courseId=${courseId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setLessonDates(data.lessonDates || []);
      setPdfs(data.pdfs || []);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  // ✅ Cancel Lesson
  const handleCancelLesson = async (lessonId) => {
    const isConfirmed = window.confirm("Czy na pewno chcesz odwołać tę lekcję?");
    if (!isConfirmed) return; 

    try {
      const response = await fetch(`http://localhost:2020/api/admin/cancel-lesson`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId }),
      });

      if (!response.ok) throw new Error("Failed to cancel lesson");

      // Update lesson status locally
      setLessonDates((prev) =>
        prev.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, status: "odwołane", link: null } : lesson
        )
      );
    } catch (error) {
      console.error("Error canceling lesson:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-gray-100 pt-[10vh] overflow-x-hidden px-4 md:px-12">
      {/* Home Icon */}
      <Link
        to={`/admin/${adminname}`}
        className="absolute top-6 left-6 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        <FaHome className="w-6 h-6 text-neonblue z-50" />
      </Link>

      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-lg z-0"
        style={{ backgroundImage: "url('/images/background-main.png')" }}
      ></div>
      <div className="absolute inset-0 bg-black bg-cover opacity-10 bg-center filter blur-lg h-full z-0"></div>

      {/* Header Section */}
      <div className="bg-neonblue text-white text-center sm:text-left rounded-3xl py-6 w-full max-w-[1000px] mx-auto px-4 z-40 relative">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Przygotowanie do matury</h1>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row px-4 sm:px-10 py-8 gap-6 w-full max-w-[1000px] mx-auto z-40 relative">
        
        {/* Left Section */}
        <div className="flex-1">
          {/* Meeting Schedule */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Terminy spotkań</h2>

            {lessonDates.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lessonDates.map((lesson, index) => (
                  <li key={index} className={`p-4 rounded-lg shadow-md flex flex-col items-center ${
                    lesson.status === "odwołane" ? "bg-red-100 border border-red-500" : "bg-gray-100"
                  }`}>
                    <span className="text-lg font-medium">{new Date(lesson.lessonDate).toLocaleString()}</span>
                    <p className="text-sm text-gray-600">Status: {lesson.status}</p>

                    {/* If lesson is canceled, show refund message & hide actions */}
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

          {/* PDF Materials */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Materiały PDF</h2>
            {pdfs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pdfs.map((pdf, index) => (
                  <div key={index} className="flex items-center bg-gray-200 p-4 rounded-lg justify-between">
                    <a href={pdf.link} download className="flex items-center">
                      <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="PDF Icon" className="w-6 h-6 mr-2" />
                      {pdf.name}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Brak dostępnych materiałów.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersCourse;
