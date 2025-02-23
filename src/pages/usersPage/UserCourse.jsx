import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

/**
 * Displays a single user course (subject, description, lessonDates, materials).
 */
const UserCourse = () => {
  const { courseId, username } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
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
        setCourseData(data);
      } catch (error) {
        console.log("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  /**
   * Formats a date string into a more readable form in Polish locale.
   */
  const dateFormatter = (dateString) => {
    const dateObj = new Date(dateString);
    return (
      <span className="text-lg font-medium">
        {dateObj.toLocaleDateString("pl-PL", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}{" "}
        {dateObj.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    );
  };

  console.log(courseData)

  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center cursor-default overflow-x-hidden relative">
      {/* Home link */}
      <Link
        to={`/user/${username}`}
        className="absolute top-6 left-6 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        <FaHome className="w-6 h-6 text-neonblue z-50" />
      </Link>

      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: "url('/images/background-main.png')" }}
      ></div>
      <div className="absolute inset-0 bg-black bg-cover opacity-10 bg-center filter blur-lg h-full z-10"></div>

      {/* Header */}
      <div className="bg-neonblue text-white py-8 px-6 md:px-20 rounded-xl shadow-lg text-center w-full max-w-[1100px] z-40">
        <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-md">
          {courseData?.description || "Ładowanie..."}
        </h1>
        <p className="mt-2 sm:mt-4 text-lg sm:text-2xl font-semibold">
          {courseData?.subject || ""}
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[90%] sm:max-w-[1100px] flex flex-col gap-8 mt-10 z-50">
        {/* Lesson Dates */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Moje zajęcia:</h2>
          <ul className="space-y-4">
            {courseData?.lessonDates?.length > 0 ? (
              courseData.lessonDates.map((lesson, index) => (
                <li
                  key={lesson._id || index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md"
                >
                  {dateFormatter(lesson.lessonDate)}

                  <div className="flex flex-col sm:flex-row gap-2 md:gap-8 mt-2 sm:mt-0">
                    {/* Link or status */}
                    {lesson.link ? (
                      <span className="text-md text-gray-700 self-center my-4">
                        <Link to={lesson.link} className="underline text-blue-600">
                          {lesson.link}
                        </Link>
                      </span>
                    ) : (
                      <span className="text-md text-gray-700 self-center my-4">
                        {lesson.status && lesson.status.trim() !== ""
                          ? lesson.status
                          : "Oczekuje na korepetytora"}
                      </span>
                    )}

                    {/* "Anuluj zajęcia" button (if applicable) */}
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
                      Anuluj zajęcia
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-lg">
                Brak zaplanowanych zajęć
              </li>
            )}
          </ul>
        </div>

        {/* Course Materials */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Moje materiały</h2>
          {courseData?.materials?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courseData.materials.map((material) => {
                const filename = material.filename.length > 15 ? material.filename.slice(0, 15) + "..." : material.filename;
                const downloadUrl = material.filePath; 

                return (
                  <a
                    key={material.id}
                    href={downloadUrl}
                    download
                    className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition text-lg font-semibold shadow-md px-4"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/pdf.png"
                      alt="PDF Icon"
                      className="w-6 h-6 mr-3"
                    />
                    {filename}
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Brak dostępnych materiałów.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourse;
