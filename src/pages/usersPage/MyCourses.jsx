import React from "react";
import myCoursesData from "../../logic/MyCourses";
import HoverLetters from "../../logic/HoverLetters";

const MyCourses = () => {
  const renderCourses = myCoursesData.map((course) => (
    <div
      key={course.id}
      className="bg-white mx-auto min-w-[800px] max-w-[1000px] flex justify-between border-2 border-solid border-slate-900 rounded-[35px] px-8 py-4 mb-6 cursor-pointer"
    >
    <div className="flex flex-col justify-center">
        <div className="text-3xl font-bold text-left mb-4">
            <div className='text-3xl font-bold text-left max-w-[600px]'>{course.name.split(" ")[0]} <span className='text-2xl text-gray-600 text-left max-w-[600px] ml-4'>{course.name.split(" ").slice(1).join(" ")}</span></div>
        </div>
        <div className="text-lg text-gray-500 text-left">
          Najbliższe zajęcia: {course.dateBought} (wtorek)
        </div>
      </div>
      <img alt="Course image" className="w-32 h-32" src="../../images/subjectIcon.png" />
    </div>
  ));

  return (
    <div
      id="myCourses"
      className="bg-slate-50 w-screen text-center mb-10 flex flex-col justify-center basic py-32 px-4"
    >
      <div>
        <div className="text-[40px] mb-8 titles font-bold">{HoverLetters("Moje kursy")}</div>
        {renderCourses}
      </div>
    </div>
  );
};

export default MyCourses;
