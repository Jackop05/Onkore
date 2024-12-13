import React, { useState } from "react";
import { Link } from 'react-router-dom';
import HoverLetters from "../../logic/HoverLetters";

const Hero = ({ teacherName, offers, students }) => {
    const [availability, setAvailability] = useState([]);

    const handleAddAvailability = () => {
        setAvailability([...availability, { day: "", start: "", end: "" }]);
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updated = [...availability];
        updated[index][field] = value;
        setAvailability(updated);
    };

    return (
      <div className="bg-slate-50 w- min-h-screen overflow-x-hidden">
        <div className="text-slate-900 w-screen px-12 py-4 flex justify-between h-[80px] shadow-xl rounded-b-xl bg-white fixed z-50">
            <div className="items-center">
                <img src="./images/logoOnkoreIcon.png" alt="onkore" className="h-[42px]" />
            </div>
            <div className="flex gap-16 text-2xl font-semibold items-center tracking-wide">
                <Link
                        to="/logowanie-tutor"
                        className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
                >
                    Zaloguj
                </Link>
                <Link
                        to="/rejestracja-tutor"
                        className="cursor-pointer hover:drop-shadow-sm hover:text-neonblue transition-all duration-150"
                >
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
                                {[
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday",
                                    "Sunday",
                                ].map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
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
                            <button
                                className="px-4 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-500"
                                onClick={"..."}
                            >
                                Usuń
                            </button>
                        </div>
                    ))}
                    <div className=" flex justify-between">
                        <button
                            className="px-4 py-2 bg-neonblue text-white rounded-lg font-bold hover:bg-blue-500"
                            onClick={handleAddAvailability}
                        >
                            Dodaj dostępność
                        </button>
                        <button
                        className="px-4 py-2 bg-neonblue text-white rounded-lg font-bold hover:bg-blue-500"
                        onClick={"..."}
                        >
                            Zatwierdź
                        </button>
                    </div>
                </div>

                {/* Offers Section */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6">Oferty do zaakceptowania</h2>
                    {offers == null &&
                        <div className="text-gray-700 text-xl">Nie ma żadnych nowych ofert</div>
                    }
                    <ul className="divide-y">
                    {offers?.map((offer, index) => (
                        <li key={index} className="py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-medium">{offer.subject}</p>
                                <p className="text-gray-600">{offer.details}</p>
                            </div>
                            <button className="px-4 py-2 bg-neonblue text-white rounded-lg hover:bg-blue-500">
                            Zaakceptuj
                            </button>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Students Section */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-20">
                    <h2 className="text-3xl font-bold mb-6">Twoi uczniowie</h2>
                    {students == null &&
                        <div className="text-gray-700 text-xl">Nie masz jeszcze żadnych uczniów</div>
                    }
                    <ul className="divide-y">
                        {students?.map((student, index) => (
                            <li key={index} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-neonblue">{student.name}</p>
                                    <p className="text-gray-600">{student.contact}</p>
                                </div>
                                <button className="px-4 py-2 bg-neongreen text-black rounded-lg hover:bg-green-400">
                                    Wyślij wiadomość
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
