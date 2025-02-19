import React, { useEffect, useState } from "react";
import HoverLetters from "../../logic/HoverLetters";



const Teachers = () => {
  const [teachers, setTeachers] = useState([]);


  // UseEffect fetching all admin data
  useEffect(() => {
    fetch("http://localhost:2020/api/admin/get-all-admins-data")
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  // Decides if no profile photo will be a male or a female
  const profileImage = teachers.map((teacher) => {
    return (teacher?.name?.trim().slice(-1).toLowerCase() === "a" ? "/images/noProfileImageale.png" : "/images/noProfileImageMale.png");
  }) 


  return (
    <div className="bg-slate-100 text-center mb-10 py-20 w-full relative top-16 px-4">

      {/* Title */}
      <div className="text-[32px] sm:text-[40px] mb-8 titles font-bold">
        {HoverLetters("Poznaj naszych korepetytorów")}
      </div>

      {/* Teachers listed */}
      <div id="teachers" className="flex flex-col items-center gap-12">
        {teachers?.map((teacher, index) => (
          <div
            key={teacher.id}
            className="bg-white w-full max-w-[900px] mx-auto rounded-2xl shadow-lg px-8 py-6 flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all duration-300"
          >

            {/* Profile image */}
            <img
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full"
              alt="Profile Image"
              src={profileImage[index]}
            />

            {/* Teacher info */}
            <div className="text-center md:text-left flex flex-col gap-4 flex-1">
              <div className="text-xl sm:text-2xl font-bold cursor-pointer">
                {HoverLetters(teacher.name, "neonblue")}
              </div>

              {/* Teacher's subjects listed */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {teacher?.subjects?.map((subject, indexSubject) => (
                  <div
                    key={indexSubject}
                    className="flex items-center bg-gray-100 px-3 py-1 rounded-lg shadow-sm"
                  >
                    <img
                      src="../images/teachersSubjectIcon.png"
                      alt="Subject Icon"
                      className="w-10 h-10 sm:w-8 sm:h-8 mr-2"
                    />
                    <div className="text-sm sm:text-base">{subject}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About me section */}
            <div className="w-full md:w-[300px] text-gray-700 text-md sm:text-base">
              <div className="text-lg sm:text-2xl font-bold mb-2 md:mb-4 md:text-left">O mnie</div>
              <div className="text-center md:text-left">{teacher.about}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
