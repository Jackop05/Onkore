import React, { useState, useEffect } from 'react';
import HoverLetters from '../../logic/HoverLetters';

const Offers = () => {
  const [subjectCoursesData, setSubjectCoursesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace the URL with your backend endpoint
    fetch('http://localhost:2020/api/subject-courses/get-subject-courses')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSubjectCoursesData(data))
      .catch((err) => setError(err.message));
  }, []);
  console.log(subjectCoursesData)

  const images = [
    "./images/subjectIcon0.png", "./images/subjectIcon1.png", "./images/subjectIcon2.png",
    "./images/subjectIcon3.png", "./images/subjectIcon4.png", "./images/subjectIcon5.png",
    "./images/subjectIcon6.png", "./images/subjectIcon7.png", "./images/subjectIcon8.png",
    "./images/subjectIcon9.png", "./images/subjectIcon10.png", "./images/subjectIcon11.png",
    "./images/subjectIcon12.png"
  ];

  const renderCourses = () => {
    if (!subjectCoursesData || subjectCoursesData.length === 0) {
      return <p>No courses available.</p>; // Display a message if there's no data
    }

    return subjectCoursesData.map((course, index) => (
      <div
        key={course.id}
        className="bg-white min-w-[800px] max-w-[1000px] flex justify-between border-2 border-solid border-slate-900 rounded-[35px] px-8 py-4 mb-6"
      >
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 justify-center">
            <div className="text-3xl font-bold text-left max-w-[600px]">
              {course.subject}{" "}
              <span className="text-2xl text-gray-600 text-left max-w-[600px] ml-4">
                {course.level}
              </span>
            </div>
            <div className="text-xl text-gray-700 text-left">
              {course.description}
            </div>
            <div className="text-2xl text-left font-bold">{course.price} PLN</div>
          </div>
        </div>
        <div className="flex gap-8">
          <img
            className="w-32 h-32"
            src={images[course.iconIndex] || "./images/defaultIcon.png"} // Fallback to a default image if iconIndex is invalid
            alt={`${course.subject} icon`}
          />
          <div className="flex flex-col justify-center">
            <div className="bg-neonblue px-8 py-4 rounded-2xl text-xl font-bold shadow-sm transition-all duration-150 hover:scale-110 max-w-[400px] cursor-pointer">
              Kup lekcje
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      id="offers"
      className="bg-slate-50 w-screen text-center mb-10 flex justify-center basic py-32 px-4"
    >
      <div>
        <div className="text-[40px] mb-8 titles font-bold">
          {HoverLetters("Znajdź coś dla siebie")}
        </div>
        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
        {renderCourses()} {/* Render courses */}
      </div>
    </div>
  );
};

export default Offers;
