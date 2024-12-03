import React from "react";
import HoverLetters from "../../logic/HoverLetters";
import teachers from "../../logic/Teachers";

const Advantages = () => {
  return (
    <div className="bg-slate-100 text-center mb-10 py-20 w-screen relative top-16">
      <div className="text-[40px] mb-8 titles font-bold">{HoverLetters("Poznaj naszych korepetytorów")}</div>
      <div id="teachers" className="flex flex-col justify-center gap-12">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white max-w-[1200px] mx-auto rounded-[15px] shadow-lg px-16 py-8 flex gap-12 justify-between">
            <img className="w-40 h-40 rounded-full self-center" alt="Profile Image" src={teacher.profileImage} />

            <div className="text-left mr-12">
              <div className="text-2xl font-bold mb-2 cursor-pointer">{HoverLetters(teacher.name, "neonblue")}</div>
              {teacher.subjects.map((subject, index) => (
                <div key={index} className="flex gap-2">
                  <img src="../images/temporarySubjectIcon.png" alt="Subject Icon" className="w-8 h-8" />
                  <div className="self-center">{subject}</div>
                </div>
              ))}
              <div className="text-lg mt-2">Przeprowadził {teacher.lessonsCount} lekcji</div>
            </div>

            <div className="">
              <div className="text-2xl font-bold mb-4">O mnie</div>
              <div className="max-w-[300px] flex flex-col justify-center">{teacher.about}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advantages;
