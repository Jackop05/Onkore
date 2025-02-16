import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HoverLetters from "../../logic/HoverLetters";

const Hero = () => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]); // ✅ Stores current courses
    const [newAvailability, setNewAvailability] = useState({ weekday: "", hourStart: "", hourEnd: "" });

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const response = await fetch("http://localhost:2020/api/admin/get-admin-data", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

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

    const fetchAdminCourses = async () => {
        try {
            const response = await fetch("http://localhost:2020/api/admin/get-admin-current-courses", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Fetched Admin Courses:", data);
            setCurrentCourses(data || []); // ✅ Store fetched courses
        } catch (error) {
            console.error("Error fetching admin courses:", error);
        }
    };

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

    const handleAvailabilityChange = (field, value) => {
        setNewAvailability(prevState => ({ ...prevState, [field]: value }));
    };

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

    return (
        <div className="bg-slate-50 max-w-screen min-h-screen overflow-x-hidden">
            <div className="text-slate-900 w-screen px-12 py-4 flex justify-between h-[80px] shadow-xl rounded-b-xl bg-white fixed z-50">
                <div className="items-center">
                    <img src="./images/logoOnkoreIcon.png" alt="onkore" className="h-[42px]" />
                </div>
                <div className="flex gap-16 text-2xl font-semibold items-center tracking-wide">
                    <Link to="/rejestracja-tutor" className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150">
                        Ucz z nami
                    </Link>
                </div>
            </div>

            {/* Welcome Section */}
            <div className="mt-40 px-24">
                <div className="text-center mb-8">
                    <h1 className="text-[70px] font-bold text-neonblue drop-shadow-md mb-2 titles">
                        {HoverLetters(`Hej ${adminData?.username || "Nauczycielu"}!`)}
                    </h1>
                    <p className="text-2xl text-gray-800 font-medium mb-16">
                        Sprawdź swoje oferty oraz swoich studentów, zarządzaj dostępnością i uczniami.
                    </p>
                </div>

                <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
                    {/* Availability Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold mb-6">Twoja Dostępność</h2>
                        
                        {availability.length > 0 ? (
                            <ul>
                                {availability.map((slot) => (
                                    <li key={slot.id} className="flex items-center gap-4 mb-2 bg-gray-100 p-3 rounded-lg justify-between px-8">
                                        <span>{slot.weekday}</span>
                                        <span>{slot.hourStart} - {slot.hourEnd}</span>
                                        <button
                                            className="text-red-500 font-bold hover:text-red-700"
                                            onClick={() => handleDeleteAvailability(slot.id)}
                                        >
                                            🗑️ Usuń
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">Brak zapisanej dostępności.</p>
                        )}

                        <h2 className="text-2xl font-bold mt-6 mb-4">Dodaj Dostępność</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <select
                                className="p-2 border rounded-lg focus:ring focus:ring-neonblue w-1/4"
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
                                className="p-2 border rounded-lg focus:ring focus:ring-neonblue w-1/4"
                                value={newAvailability.hourStart}
                                onChange={(e) => handleAvailabilityChange("hourStart", e.target.value)}
                            />
                            <input
                                type="time"
                                className="p-2 border rounded-lg focus:ring focus:ring-neonblue w-1/4"
                                value={newAvailability.hourEnd}
                                onChange={(e) => handleAvailabilityChange("hourEnd", e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-neonblue text-white rounded-lg font-bold hover:bg-blue-500" onClick={submitAvailability}>
                                Dodaj Dostępność
                            </button>
                        </div>
                    </div>

                    {/* Current Courses Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-10">
                        <h2 className="text-3xl font-bold mb-6">Twoje Kursy</h2>
                        {currentCourses.length > 0 ? (
                            <ul className="divide-y divide-gray-300">
                                {currentCourses.map((course, index) => (
                                    <li key={index} className="py-6">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-semibold">{course.subject}</h3>
                                            <p className="text-gray-600">{course.description}</p>
                                            <p className="text-gray-500 text-sm">Prowadzący: <span className="font-medium">{course.username}</span></p>
                                        </div>

                                        {/* Lesson Dates */}
                                        {course.lessonDates && course.lessonDates.length > 0 ? (
                                            <ul className="mt-4 space-y-3">
                                                {course.lessonDates.map((lesson, idx) => (
                                                    <li key={idx} className="bg-gray-100 p-3 rounded-lg flex flex-col gap-3">
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">
                                                                    Data lekcji: {new Date(lesson.lessonDate).toLocaleString()}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    Status: <span className="font-medium">{lesson.status || "Brak statusu"}</span>
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Input for meeting link */}
                                                        <div className="flex items-center gap-4">
                                                            <input
                                                                type="text"
                                                                placeholder="Wpisz link do spotkania..."
                                                                className="p-2 border rounded-lg flex-1"
                                                                value={lesson.link || ""}
                                                                onChange={(e) => handleLinkChange(course.id, lesson.id, e.target.value)}
                                                            />
                                                            <button
                                                                className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500"
                                                                onClick={() => submitMeetingLink(course.id, lesson.id, lesson.link)}
                                                            >
                                                                Zapisz
                                                            </button>
                                                        </div>

                                                        {/* Display Join Link if exists */}
                                                        {lesson.link && lesson.link !== "http://" && (
                                                            <a
                                                                href={lesson.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline font-medium"
                                                            >
                                                                🔗 Dołącz do spotkania
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 text-sm">Brak zaplanowanych lekcji.</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">Nie masz żadnych kursów.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
