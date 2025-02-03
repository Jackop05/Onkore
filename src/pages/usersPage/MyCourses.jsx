import React from "react";
import HoverLetters from "../../logic/HoverLetters";

const MyCourses = ({ userData }) => {
  if (!userData || !userData.currentCourses) {
    return <p className="text-center text-lg mt-6">Ładowanie Twoich kursów...</p>;
  }

  return (
    <div
      id="myCourses"
      className="bg-slate-50 w-screen text-center mb-10 flex flex-col justify-center basic py-32 px-4"
    >
      <h1 className="text-[40px] mb-8 titles font-bold">{HoverLetters("Moje kursy")}</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {userData.currentCourses.length === 0 ? (
          <p className="text-gray-700">Nie masz jeszcze zapisanych kursów.</p>
        ) : (
          userData.currentCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white mx-auto min-w-[800px] max-w-[1000px] flex justify-between border-2 border-solid border-slate-900 rounded-[35px] px-8 py-4 mb-6 cursor-pointer"
            >
              <div className="flex flex-col justify-center">
                <div className="text-3xl font-bold text-left mb-4">
                  <div className='text-3xl font-bold text-left max-w-[600px]'>
                    {course.description.split(" ")[0]} 
                    <span className='text-2xl text-gray-600 text-left max-w-[600px] ml-4'>
                      {course.description.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                </div>
                <div className="text-lg text-gray-500 text-left">
                  Poziom: {course.level}
                </div>
                <div className="text-lg text-gray-500 text-left">
                  Prowadzący: {course.username}
                </div>
                <div className="text-lg text-gray-500 text-left">
                  Cena: {course.price} PLN
                </div>
              </div>
              <img alt="Course image" className="w-32 h-32" src="../../images/subjectIcon.png" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;
