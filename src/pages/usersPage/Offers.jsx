import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HoverLetters from "../../logic/HoverLetters";



const Offers = ({ userData }) => {
  const [subjectCoursesData, setSubjectCoursesData] = useState(null);
  const [error, setError] = useState(null);

  const images = [
    "/images/subjectIcons/englishIcon1.png",
    "/images/subjectIcons/englishIcon2.png",
    "/images/subjectIcons/englishIcon3.png",
    "/images/subjectIcons/englishIcon4.png",
    "/images/subjectIcons/englishIcon5.png",
    "/images/subjectIcons/mathIcon1.png",
    "/images/subjectIcons/mathIcon2.png",
    "/images/subjectIcons/mathIcon3.png",
    "/images/subjectIcons/mathIcon4.png",
    "/images/subjectIcons/mathIcon5.png",
    "/images/subjectIcons/physicsIcon1.png",
    "/images/subjectIcons/physicsIcon2.png",
    "/images/subjectIcons/physicsIcon3.png",
  ];


  // UseEffect for fetching all subject courses data 
  useEffect(() => {
    fetch("http://localhost:2020/api/subject-courses/get-subject-courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSubjectCoursesData(data))
      .catch((err) => setError(err.message));
  }, []);

  // Renders all subject courses
  const renderCourses = () => {
    if (!subjectCoursesData || subjectCoursesData.length === 0) {
      return <p className="text-lg text-gray-500 mt-4">Brak dostępnych kursów.</p>;
    }

    return subjectCoursesData.map((course, index) => (
      <div key={course.id} className="w-full max-w-[1000px] my-3">

        {/* Course card */}
        <div
          className={`bg-white flex flex-col md:flex-row justify-between border-2 border-solid border-slate-900 rounded-3xl px-6 py-6 md:py-8 shadow-lg transition-all duration-200 hover:shadow-xl ${
            course.level === "szkoła podstawowa" ? "mt-20" : ""
          }`}
        >

          {/* Course info */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img
              src={images[course.iconIndex] || "/images/defaultIcon.png"}
              decoding="async"
              alt={`${course.subject} icon`}
              className="h-16 md:h-20"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {course.subject}{" "}
                <span className="text-lg md:text-2xl text-gray-600">{course.level}</span>
              </h2>
              <p className="text-xl md:text-2xl font-bold text-neonblue mt-2">{course.price} PLN</p>
            </div>
          </div>

          {/* Buy button */}
          <div className="flex justify-center md:justify-end items-center mt-4 md:mt-0">
            <Link
              to={`/user/buy-course/${userData?.username}/${course?.id}`}
              className="bg-neonblue px-6 py-3 md:px-8 md:py-4 rounded-xl text-lg md:text-xl font-bold text-white shadow-sm transition-transform duration-150 hover:scale-105"
            >
              Kup lekcje
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div id="offers" className="bg-slate-100 w-full flex justify-center py-20 px-4">
      <div className="max-w-[1100px] w-full">

        {/* Title */}
        <h1 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold text-center mt-4">
          {HoverLetters("Znajdź coś dla siebie")}
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Rendered courses */}
        <div className="flex flex-col items-center">{renderCourses()}</div>
      </div>
    </div>
  );
};

export default Offers;
