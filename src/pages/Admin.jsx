import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HoverLetters from "../logic/HoverLetters";



const Admin = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]); // ✅ Stores current courses
    const [newAvailability, setNewAvailability] = useState({ weekday: "", hourStart: "", hourEnd: "" });
    const [meetingLinks, setMeetingLinks] = useState({});


    // UseEffect calls fetchAdminData
    useEffect(() => {
        fetchAdminData();
    }, []);

    // Function fetches for admin data 
    const fetchAdminData = async () => {
        try {
            const response = await fetch("http://localhost:2020/api/admin/get-admin-data", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
              navigate('/admin/logowanie');
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Admin Data:", data);

            if (data?.username) {
                setAdminData(data);
                fetchAvailability(data.id);
                fetchAdminCourses();
                navigate(`/admin/${data.username}`);
            } 
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    // Function fetches for admin courses data
    const fetchAdminCourses = async () => {
      try {
        const response = await fetch("http://localhost:2020/api/admin/get-admin-current-courses", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
  
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        const data = await response.json();
        setCurrentCourses(data || []);
  
        const linksMap = data.reduce((acc, course) => {
          course.lessonDates.forEach((lesson) => {
            acc[lesson.id] = lesson.link && lesson.link.length > 0 ? lesson.link : "";
          });
          return acc;
        }, {});
  
        setMeetingLinks(linksMap);
      } catch (error) {
        console.error("Error fetching admin courses:", error);
      }
    };

    // Function fetches for admin availability
    const fetchAvailability = async (adminId) => {
        try {
            const response = await fetch(`http://localhost:2020/api/admin/get-availability?adminId=${adminId}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Fetched Availability:", data);
            setAvailability(data.availability || []);
        } catch (error) {
            console.error("Error fetching availability:", error);
        }
    };

    // Handles changes in availability on website
    const handleAvailabilityChange = (field, value) => {
        setNewAvailability(prevState => ({ ...prevState, [field]: value }));
    };

    // Function sends new availability to the database
    const submitAvailability = async () => {
        if (!newAvailability.weekday || !newAvailability.hourStart || !newAvailability.hourEnd) {
            alert("Proszę wypełnić wszystkie pola przed dodaniem dostępności.");
            return;
        }

        try {
            const response = await fetch("http://localhost:2020/api/admin/post-availability", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    admin_id: adminData.id,
                    weekday: newAvailability.weekday,
                    hourStart: newAvailability.hourStart,
                    hourEnd: newAvailability.hourEnd,
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("Dostępność została dodana!");
            fetchAvailability(adminData.id);
            setNewAvailability({ weekday: "", hourStart: "", hourEnd: "" });
        } catch (error) {
            console.error("Error posting availability:", error);
        }
    };

    // Function deletes availability in database
    const handleDeleteAvailability = async (availabilityId) => {
        try {
            const response = await fetch("http://localhost:2020/api/admin/delete-availability", {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ admin_id: adminData.id, availability_id: availabilityId }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("Dostępność została usunięta!");
            fetchAvailability(adminData.id);
        } catch (error) {
            console.error("Error deleting availability:", error);
        }
    };

    // Function sends new meeting link into database
    const sendMeetingLink = async (courseId, lessonId) => {
      const link = meetingLinks[lessonId] || ""; 
      try {
        const response = await fetch("http://localhost:2020/api/admin/update-lesson-link", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, lessonId, link, status: "w trakcie" }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        alert("Link wysłany!");
        fetchAdminCourses();
      } catch (error) {
        console.error("Error sending meeting link:", error);
      }
    };

    // Function cancels meeting
    const cancelMeeting = async (courseId, lessonId) => {
      try {
        const response = await fetch("http://localhost:2020/api/admin/cancel-lesson", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, lessonId }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        alert("Lekcja odwołana!");
        fetchAdminCourses();
      } catch (error) {
        console.error("Error canceling lesson:", error);
      }
    };

    // Function updates lesson status in database
    const updateLessonStatus = async (courseId, lessonId, newStatus) => {
      if (newStatus == "odowłane") {
        const isConfirmed = window.confirm("Czy na pewno chcesz odwołać tę lekcję?");
        if (!isConfirmed) return; 
      }
      
      try {
        const response = await fetch("http://localhost:2020/api/admin/update-lesson-status", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, lessonId, status: newStatus }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        alert("Status lekcji zaktualizowany!");
        fetchAdminCourses();
      } catch (error) {
        console.error("Error updating lesson status:", error);
      }
    };


    return (
      <div className="bg-slate-50 max-w-screen h-screen overflow-x-hidden">

        {/* Navbar */}
        <div className="text-slate-900 w-screen px-6 md:px-12 pt-8 pb-6 flex gap-8 justify-between shadow-xl rounded-b-xl bg-white fixed z-50 ">
            <div className="items-center self-center">
                <img src="../images/logoOnkoreIcon.png" alt="onkore" className="h-[35px] md:h-[40px] " />
            </div>
            <div className="flex  flex-row justify-center gap-16 text-xl md:text-2xl font-semibold items-center tracking-wide self-center">
                <Link to="/rejestracja-tutor" className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150 ">
                    Ucz z nami
                </Link>
            </div>
        </div>

        {/* Title */}
        <div className="mt-40 px-4 md:px-24">
            <div className="text-center mb-8">
                <h1 className="text-[50px] md:text-[70px] font-bold text-neonblue drop-shadow-md mb-2 titles">
                    {HoverLetters(`Hej ${adminData?.username || "Nauczycielu"}!`)}
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 font-medium mb-16">
                    Sprawdź swoje oferty oraz swoich studentów, zarządzaj dostępnością i uczniami.
                </p>
            </div>

            {/* Availability section */}
            <div className="flex flex-col gap-8 max-w-screen-lg mx-auto px-4 sm:px-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Twoja Dostępność</h2>

                {/* Availability listed */}
                {availability.length > 0 ? (
                  <ul className="space-y-3">
                    {availability.map((slot) => (
                      <li
                        key={slot.id}
                        className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg"
                      >
                        <span className="text-lg font-medium">{slot.weekday}</span>
                        <span className="text-md text-gray-600">{slot.hourStart} - {slot.hourEnd}</span>
                        <button
                          className="text-red-500 font-bold hover:text-red-700 mt-2 sm:mt-0"
                          onClick={() => handleDeleteAvailability(slot.id)}
                        >
                          🗑️ Usuń
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 text-center">Brak zapisanej dostępności.</p>
                )}

                {/* Add availability */}
                <h2 className="text-2xl font-bold mt-6 mb-4 text-center sm:text-left">Dodaj Dostępność</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <select
                    className="p-3 border rounded-lg focus:ring focus:ring-neonblue w-full"
                    value={newAvailability.weekday}
                    onChange={(e) => handleAvailabilityChange("weekday", e.target.value)}
                  >
                    <option value="">Wybierz dzień</option>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>

                  <input
                    type="time"
                    className="p-3 border rounded-lg focus:ring focus:ring-neonblue w-full"
                    value={newAvailability.hourStart}
                    onChange={(e) => handleAvailabilityChange("hourStart", e.target.value)}
                  />

                  <input
                    type="time"
                    className="p-3 border rounded-lg focus:ring focus:ring-neonblue w-full"
                    value={newAvailability.hourEnd}
                    onChange={(e) => handleAvailabilityChange("hourEnd", e.target.value)}
                  />
                </div>

                {/* Submit availability */}
                <div className="flex justify-center sm:justify-end mt-4">
                  <button
                    className="px-6 py-3 bg-neonblue text-white rounded-lg font-bold hover:bg-blue-500 transition"
                    onClick={submitAvailability}
                  >
                    Dodaj Dostępność
                  </button>
                </div>
              </div>

              {/* Current courses section */}
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-screen-lg mx-auto mb-10">
                <h2 className="text-3xl font-bold mb-6">Twoje Kursy</h2>

                {/* Current courses listed */}
                {currentCourses.length > 0 ? (
                  <ul className="divide-y divide-gray-300">
                    {currentCourses.map((course, index) => (
                      <li key={index} className="py-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold">{course.subject}</h3>
                          <p className="text-gray-500 text-sm">
                            Uczeń: <span className="font-medium">{course.username}</span>
                          </p>
                        </div>

                        {/* Lessons listed */}
                        {course.lessonDates && course.lessonDates.length > 0 ? (
                          <ul className="mt-4 space-y-4">
                            {course.lessonDates.map((lesson, idx) => {
                              const isCanceled = lesson.status === "odwołane";
                              return (
                                <li key={idx} className={`p-4 rounded-lg flex flex-col gap-4 ${isCanceled ? "bg-red-100 border border-red-500" : "bg-gray-100"}`}>
                                  <p className={`text-md font-medium ${isCanceled ? "text-red-700" : "text-gray-500"}`}>
                                    Data lekcji: {new Date(lesson.lessonDate).toLocaleString()}
                                  </p>
                                  <p className={`text-md font-medium ${isCanceled ? "text-red-700" : "text-gray-500"}`}>
                                    Status: {lesson.status}
                                  </p>

                                  {/* If lesson is canceled, show information about it */}
                                  {isCanceled ? (
                                    <p className="text-md font-medium text-red-700">
                                      Twoje zajęcia zostały odwołane, środki zostaną zwrócone na twoje konto.
                                    </p>
                                  ) : (
                                    <>
                                      <select
                                        className="p-3 border rounded-lg w-full sm:w-auto mb-6 md:mb-0"
                                        value={lesson.status}
                                        onChange={(e) => updateLessonStatus(course.id, lesson.id, e.target.value)}
                                      >
                                        <option value="zaplanowane">Zaplanowane</option>
                                        <option value="w trakcie">W trakcie</option>
                                        <option value="zakończone">Zakończone</option>
                                      </select>

                                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-4 md:mb-0">
                                        <input
                                          type="text"
                                          className="p-3 border rounded-lg flex-1 w-full sm:w-auto"
                                          value={meetingLinks[lesson.id] || ""}
                                          onChange={(e) => setMeetingLinks((prev) => ({ ...prev, [lesson.id]: e.target.value }))}
                                        />
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition"
                                          onClick={() => sendMeetingLink(course.id, lesson.id)}
                                        >
                                          Wyślij link
                                        </button>
                                      </div>
                                    </>
                                  )}

                                  {!isCanceled && (
                                    <div className="flex justify-center md:justify-between gap-4">
                                      <Link to={`/admin/user-course-admin-view/${adminData?.username}/${course.id}`} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500">
                                        Opcje
                                      </Link>
                                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500" onClick={() => cancelMeeting(course.id, lesson.id)}>
                                        Odwołaj
                                      </button>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        ) : <p className="text-gray-500">Brak zaplanowanych lekcji.</p>}
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-gray-700 text-center">Nie masz żadnych kursów.</p>}
              </div>
            </div>
        </div>
    </div>
  );
};

export default Admin;

