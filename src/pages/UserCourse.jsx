import React from 'react';

const UserCourse = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 mt-[20vh] basic relative">
      {/* Header Section */}
      <div className="bg-neonblue text-white py-6 px-60">
        <h1 className="text-5xl font-bold drop-shadow-md titles">Przygotowanie do matury</h1>
        <p className="mt-4 text-3xl font-bold drop-shadow-md titles">Matematyka</p>
        <div className="mt-4 flex items-center drop-shadow-md">
          <span className="bg-neongreen text-black px-3 py-1 rounded-md text-sm font-semibold mr-2">Bestseller</span>
          <span className="text-sm">4.4 <span className="">★</span> (106 ocen)</span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row px-10 py-8">
        {/* Left Section */}
        <div className="flex-1">
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

          <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
            <h2 className="px-6 text-xl font-semibold mb-4">Moje zajęcia</h2>
            <ul className="px-6 space-y-4">
              <li className="flex items-center justify-between bg-neonblue/60 p-4 rounded-lg shadow-md">
                <span className="text-lg font-medium">28.11 (11:15)</span>
                <div className='flex gap-8'>
                    <div className="text-md text-gray-700 self-center">Zatwierdzono</div>
                    <div className='text-md bg-red-400 px-4 py-2 rounded-xl cursor-pointer'>Anuluj zajęcia</div>
                </div>
              </li>
              <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <span className="text-lg font-medium">10.12 (11:15)</span>
                <div className='flex gap-8'>
                    <div className="text-md text-gray-700 self-center drop-shadow-md">Zatwierdzono</div>
                    <div className='text-md bg-red-400 px-4 py-2 rounded-xl cursor-pointer'>Anuluj zajęcia</div>
                </div>
              </li>
              <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <span className="text-lg font-medium">20.12 (11:15)</span>
                <div className='flex gap-8'>
                    <div className="text-md text-gray-700 self-center">Oczekuje na korepetytora</div>
                    <div className='text-md bg-red-400 px-4 py-2 rounded-xl cursor-pointer'>Anuluj zajęcia</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-[1200px]">
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
        

        {/* Right Section */}
        <div className="md:w-1/3 md:ml-10 mt-8 md:mt-0 fixed top-[300px] right-[20px]">
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Course Preview"
              className="w-full rounded-lg mb-4"
            />
            <p className="text-gray-700 text-xl">
              Math lectures description to make user know what this is about. Comprehensive and engaging content designed to
              help you excel in your studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourse;