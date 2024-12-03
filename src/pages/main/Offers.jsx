import React from 'react';
import Courses from '../../logic/Courses';



const Offers = () => {
  const images = ["./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png", "./images/subjectIcon.png"]

  console.log(Courses);

  let index = -1;
  const renderCourses = Object.entries(Courses).map(([subjectKey, subject]) => {
    const subjectCourses = Object.entries(subject).map(([courseKey, course]) => {
      index++;

      return (
        <div key={courseKey} className='bg-white min-w-[800px] max-w-[1000px] flex justify-between border-2 border-solid border-slate-900 rounded-[35px] px-8 py-4'>
          <div className='flex gap-8'>
            <div className='flex flex-col gap-4 justify-center'>
              <div className='text-3xl font-bold text-left max-w-[600px]'>{course.name.split(" ")[0]} <span className='text-2xl text-gray-600 text-left max-w-[600px] ml-4'>{course.name.split(" ").slice(1).join(" ")}</span></div>
              <div className='text-2xl text-left'>{course.price} PLN</div>
            </div>
            <div className='flex flex-col justify-center'>                
            </div>
          </div>
          <div className='flex gap-8'>
            <img className='w-32 h-32' src={images[index]} />
            <div className='flex flex-col justify-center'>
              <div className='bg-neonblue px-8 py-4 rounded-2xl text-xl font-bold shadow-sm transition-all duration-150 hover:scale-110 max-w-[400px] cursor-pointer'>Kup lekcje</div>
            </div>
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
    <div id="offers" className='bg-slate-50 w-screen text-center mb-10 flex justify-center basic py-32 px-4'>
      <div>
        {renderCourses}
      </div>
    </div>
  );
};

export default Offers;
