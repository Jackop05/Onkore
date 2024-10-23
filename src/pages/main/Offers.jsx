import React from 'react';
import Courses from '../../logic/Courses';
import { BiMath } from "react-icons/bi";

const Offers = () => {
  const icons = [<BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />, <BiMath />];

  console.log(Courses);

  const renderCourses = Object.entries(Courses).map(([subjectKey, subject]) => {
    const subjectCourses = Object.entries(subject).map(([courseKey, course]) => {
      return (
        <div key={courseKey} className='max-w-[1000px] flex justify-between border-2 border-solid border-slate-900 rounded-[35px] px-8 py-4'>
          <div className='flex gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='text-3xl font-bold text-left'>{course.name}</div>
              <div className='text-2xl text-left'>{course.price} PLN</div>
            </div>
            <div className='flex flex-col justify-center'>
              <div className='text-[70px] text-left'>{icons[course.iconIndex]}</div>
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='bg-neonblue px-8 py-4 rounded-2xl text-xl font-bold shadow-sm transition-all duration-150 hover:scale-110 max-w-[350px] cursor-pointer'>Kup lekcje</div>
          </div>
        </div>
      );
    });

    return (
      <div className='mb-6 flex flex-col gap-8'>
        {subjectCourses}
      </div>
    );
  });

  return (
    <div className='bg-white w-screen text-center mb-10 flex justify-center basic py-20 px-4'>
      <div className=''>
        {renderCourses}
      </div>
    </div>
  );
};

export default Offers;
