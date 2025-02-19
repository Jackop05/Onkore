import React from "react";
import { Link } from "react-router-dom";
import HoverLetters from "../../logic/HoverLetters";



const MyCourses = ({ userData }) => {
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


  // Checks if userData has courses
  if (!userData || !userData.currentCourses) {
    return <p className="text-center text-lg mt-6">Ładowanie Twoich kursów...</p>;
  }

 
  return (
    <div id="myCourses" className="bg-slate-50 w-full text-center py-16 px-4 sm:px-8">

      {/* Title */}
      <h1 className="text-[32px] sm:text-[42px] md:text-[50px] font-bold mb-8">
        {HoverLetters("Moje kursy")}
      </h1>

      {/* Courses listed */}
      <div className="flex flex-wrap justify-center gap-6">
        {userData.currentCourses.length === 0 ? (
          <p className="text-gray-700 text-lg">Nie masz jeszcze zapisanych kursów.</p>
        ) : (
          userData.currentCourses.map((course, index) => {
            const iconSrc = images[course.iconIndex] || "/images/subjectIcons/defaultIcon.png";

            return (
              <Link
                to={`/user/user-course/${userData.username}/${course.id}`}
                key={course.id}
                className="bg-white w-full sm:w-[90%] md:w-[700px] lg:w-[800px] xl:w-[1000px] flex flex-col sm:flex-row justify-between border-2 border-slate-900 rounded-[25px] p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                    <span className="text-gray-900">{course.description.split(" ")[0]}</span>{" "}
                    <span className="text-xl sm:text-2xl text-gray-600">
                      {course.description.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg text-gray-500 mb-4">
                    Poziom: {course.level}
                  </div>
                </div>
                <img
                  alt={`${course.subject} icon`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-lg self-center"
                  src={iconSrc}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyCourses;
