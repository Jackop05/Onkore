import React, { useEffect, useState } from "react";
import HoverLetters from "../../logic/HoverLetters";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2020/api/admin/get-all-admins-data")
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  return (
    <div className="bg-slate-100 text-center mb-10 py-20 w-screen relative top-16">
      <div className="text-[40px] mb-8 titles font-bold">
        {HoverLetters("Poznaj naszych korepetytorów")}
      </div>
      <div id="teachers" className="flex flex-col justify-center gap-12">
        {teachers?.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white h-[220px] w-[700px] mx-auto rounded-[15px] shadow-lg px-16 py-8 flex gap-12 justify-between"
          >
            <img
              className="w-40 h-40 rounded-full self-center"
              alt="Profile Image"
              src="../images/noProfileImageMale.png"
            />

            <div className="text-left mr-12">
              <div className="text-2xl font-bold mb-2 cursor-pointer">
                {HoverLetters(teacher.name, "neonblue")}
              </div>
              {teacher?.subjects?.map((subject, index) => (
                <div key={index} className="flex gap-2">
                  <img
                    src="../images/temporarySubjectIcon.png"
                    alt="Subject Icon"
                    className="w-8 h-8"
                  />
                  <div className="self-center">{subject}</div>
                </div>
              ))}
            </div>

            <div className="">
              <div className="text-2xl font-bold mb-4">O mnie</div>
              <div className="max-w-[300px] flex flex-col justify-center">
                {teacher.about}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
