import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            method: 'GET',
            credentials: 'include', 
            headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className="h-screen w-screen bg-gray-100 pt-[20vh] basic relative overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-neonblue text-white py-6 px-60">
        <h1 className="text-5xl font-bold drop-shadow-md titles">{courseData?.description || 'Loading...'}</h1>
        <p className="mt-4 text-3xl font-bold drop-shadow-md titles">{courseData?.subject || ''}</p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col px-10 py-8 gap-10">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
          <h2 className="px-6 text-2xl mb-4 font-bold">Zrealizowane tematy:</h2>
          <ul className=" px-6 space-y-2 text-gray-700 flex gap-8">
            <li className='rounded-3xl bg-neonblue max-w-[500px] text-center px-8 py-2 text-white text-xl self-center'>Kinematyka</li>
            <li className='rounded-3xl bg-neonblue max-w-[500px] text-center px-8 py-2 text-white text-xl self-center'>Dynamika</li>
            <li className='rounded-3xl bg-neonblue max-w-[500px] text-center px-8 py-2 text-white text-xl self-center'>Praca, moc, energia</li>
            <li className='rounded-3xl bg-neonblue max-w-[500px] text-center px-8 py-2 text-white text-xl self-center'>Ruch drgający</li>
            <li className='rounded-3xl bg-neonblue max-w-[500px] text-center px-8 py-2 text-white text-xl self-center'>Termodynamika</li>
          </ul>
        </div>


        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
            <h2 className="px-6 text-2xl mb-4 font-bold">Moje zajęcia:</h2>
            <ul className="px-6 space-y-4">
              {courseData?.lessonDates?.map((lesson, index) => (
                <li key={index} className="flex items-center justify-between bg-neonblue/60 p-4 rounded-lg shadow-md">
                  <span className="text-lg font-medium">{lesson.lessonDate}</span>
                  <div className='flex gap-8'>
                    <div className="text-md text-gray-700 self-center">{lesson.status || 'Oczekuje na korepetytora'}</div>
                    <div className='text-md bg-red-400 px-4 py-2 rounded-xl cursor-pointer'>Anuluj zajęcia</div>
                  </div>
                </li>
              )) || <li className="text-gray-500">Brak zaplanowanych zajęć</li>}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
            <h2 className="px-6 text-xl font-semibold mb-4">Moje materiały</h2>
            <div className="px-6 grid grid-cols-2 gap-4">
              <a 
                href="/mnt/data/sample_test_pdf.pdf" 
                className="flex items-center bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition text-center"
                download
              >
                <img src="https://img.icons8.com/color/48/990000/pdf.png" alt="PDF Icon" className="w-6 h-6 mr-2"/>
                Pdf1
              </a>
              <a 
                href="/mnt/data/sample_test_pdf.pdf" 
                className="flex items-center bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition text-center"
                download
              >
                <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="PDF Icon" className="w-6 h-6 mr-2"/>
                Pdf2
              </a>
              <a 
                href="/mnt/data/sample_test_pdf.pdf" 
                className="flex items-center bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition text-center"
                download
              >
                <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="PDF Icon" className="w-6 h-6 mr-2"/>
                Pdf3
              </a>
              <a 
                href="/mnt/data/sample_test_pdf.pdf" 
                className="flex items-center bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition text-center"
                download
              >
                <img src="https://img.icons8.com/color/48/000000/pdf.png" alt="PDF Icon" className="w-6 h-6 mr-2"/>
                Pdf4
              </a>
            </div>
          </div> 
      </div>
    </div>
  );
};

export default UserCourse;
