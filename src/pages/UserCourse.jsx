import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserCourse = () => {
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, []);

  const dateFormatter = (date) => {
    return (
      <span className="text-lg font-medium">
        {new Date(date).toLocaleDateString("pl-PL", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}{" "}
        {new Date(date).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center cursor-default overflow-x-hidden">


      <div className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-lg" style={{ backgroundImage: "url('/images/background-main.png')" }}></div>
      <div className="absolute inset-0 bg-black bg-cover opacity-10 bg-center filter blur-lg h-full z-10"></div>

      {/* Header */}
      <div className="bg-neonblue text-white py-8 px-6 md:px-20 rounded-xl shadow-lg text-center w-full max-w-[1100px] z-50">
        <div>
          <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-md">
            {courseData?.description || "Ładowanie..."}
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-2xl font-semibold">
            {courseData?.subject || ""}
          </p>
        </div>
        <div>
          <img />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[90%] sm:max-w-[1100px] flex flex-col gap-8 mt-10 z-50">
        {/* Topics Covered */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Zrealizowane tematy:</h2>
          <div className="flex flex-wrap gap-4">
            {["Kinematyka", "Dynamika", "Praca, moc, energia", "Ruch drgający", "Termodynamika"].map((topic, index) => (
              <span key={index} className="bg-neonblue text-white px-6 py-2 rounded-xl text-lg shadow-md">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Lesson Schedule */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Moje zajęcia:</h2>
          <ul className="space-y-4">
            {courseData?.lessonDates?.length > 0 ? (
              courseData.lessonDates.map((lesson, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md"
                >
                  {dateFormatter((lesson.lessonDate))}
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-8 mt-2 sm:mt-0">
                    {lesson.link != null &&
                      <span className="text-md text-gray-700 self-center my-4"><Link to={lesson.link}>{lesson.link}</Link></span>
                    }
                    {lesson.link == null &&
                       <span className="text-md text-gray-700 self-center my-4">{lesson.status || "Oczekuje na korepetytora"}</span>
                    }
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
                      Anuluj zajęcia
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-lg">Brak zaplanowanych zajęć</li>
            )}
          </ul>
        </div>

        {/* Course Materials */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Moje materiały</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Pdf1", "Pdf2", "Pdf3", "Pdf4"].map((pdf, index) => (
              <a
                key={index}
                href="/mnt/data/sample_test_pdf.pdf"
                className="flex items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition text-lg font-semibold shadow-md"
                download
              >
                <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="PDF Icon" className="w-6 h-6 mr-3" />
                {pdf}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourse;
