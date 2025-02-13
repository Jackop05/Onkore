import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import HoverLetters from "../../logic/HoverLetters";

const Hero = () => {
    const [availability, setAvailability] = useState([]);
    const [currentCourses, setCurrentCourses] = useState([]);

    const teacherName = "New Teacher";
    const adminId = "admin_id_placeholder";  // Replace with actual admin ID

    useEffect(() => {
        fetchAvailability();
        fetchCurrentCourses();
    }, []);

    const fetchAvailability = async () => {
        try {
            const response = await fetch(`/api/admin/get-availability`);
            const data = await response.json();
            if (data && data.availability) {
                setAvailability(data.availability);
            }
        } catch (error) {
            console.error("Error fetching availability:", error);
        }
    };

    const fetchCurrentCourses = async () => {
        try {
            const response = await fetch(`/api/admin/get-admin-data`);
            const data = await response.json();
            if (data && data.currentCourses) {
                setCurrentCourses(data.currentCourses);
            }
        } catch (error) {
            console.error("Error fetching current courses:", error);
        }
    };

    const handleAddAvailability = () => {
        setAvailability([...availability, { day: "", start: "", end: "" }]);
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updated = [...availability];
        updated[index][field] = value;
        setAvailability(updated);
    };

    const submitAvailability = async () => {
        try {
            await fetch(`/api/admin/post-availability`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_id: adminId,
                    availability: availability.map(slot => ({
                        weekday: slot.day,
                        startHour: slot.start,
                        endHour: slot.end,
                    })),
                }),
            });
            alert("Dostępność zaktualizowana!");
        } catch (error) {
            console.error("Error updating availability:", error);
        }
    };

    return (
        <div className="bg-slate-50 w- min-h-screen overflow-x-hidden">
            <div className="text-slate-900 w-screen px-12 py-4 flex justify-between h-[80px] shadow-xl rounded-b-xl bg-white fixed z-50">
                <div className="items-center">
                    <img src="./images/logoOnkoreIcon.png" alt="onkore" className="h-[42px]" />
                </div>
                <div className="flex gap-16 text-2xl font-semibold items-center tracking-wide">
                    <Link to="/logowanie-tutor" className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150">
                        Zaloguj
                    </Link>
                    <Link to="/rejestracja-tutor" className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150">
                        Ucz z nami
                    </Link>
                </div>
            </div>

            {/* Welcome Section */}
            <div className="relative top-40 px-24">
                <div className="text-center mb-8">
                    <h1 className="text-[70px] font-bold text-neonblue drop-shadow-md mb-2 titles">
                        {HoverLetters(`Hej ${teacherName}!`)}
                    </h1>
                    <p className="text-2xl text-gray-800 font-medium mb-16">
                        Sprawdź swoje oferty oraz swoich studentów, zarządzaj dostępnością i uczniami.
                    </p>
                </div>

                <div className="flex flex-col gap-8 max-w-[1200px] mx-auto">
                    {/* Availability Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold mb-6">Dostępność</h2>
                        {availability.map((slot, index) => (
                            <div key={index} className="flex items-center gap-4 mb-4">
                                <select
                                    className="p-2 border rounded-lg focus:ring focus:ring-neonblue w-1/4"
                                    value={slot.day}
                                    onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
                                >
                                    <option value="">Wybierz dzień</option>
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <input
                                    type="time"
                                    className="p-2 border rounded-lg focus:ring focus:ring-neonblue w-1/4"
                                    value={slot.start}
                                    onChange={(e) => handleAvailabilityChange(index, "start", e.target.value)}
                                />
                                <input
                                    type="time"
                                    className="p-2 border rounded-lg focus:ring focus:ring-neonblue w-1/4"
                                    value={slot.end}
                                    onChange={(e) => handleAvailabilityChange(index, "end", e.target.value)}
                                />
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <button className="px-4 py-2 bg-neonblue text-white rounded-lg font-bold hover:bg-blue-500" onClick={handleAddAvailability}>
                                Dodaj dostępność
                            </button>
                            <button className="px-4 py-2 bg-neonblue text-white rounded-lg font-bold hover:bg-blue-500" onClick={submitAvailability}>
                                Zatwierdź
                            </button>
                        </div>
                    </div>

                    {/* Current Courses Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold mb-6">Twoje kursy</h2>
                        {currentCourses.length === 0 && <div className="text-gray-700 text-xl">Nie masz żadnych kursów</div>}
                        <ul className="divide-y">
                            {currentCourses.map((course, index) => (
                                <li key={index} className="py-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium">{course.courseName}</p>
                                        <p className="text-gray-600">{course.studentName}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-neongreen text-black rounded-lg font-bold tracking-wide hover:bg-green-400">
                                        Zobacz kurs
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
