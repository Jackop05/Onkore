import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const BuyCourse = () => {
  const navigate = useNavigate();
  const { courseId, username } = useParams();

  const [availableDays, setAvailableDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [loadingPromoCode, setLoadingPromoCode] = useState(false);
  const [promoCodeStatus, setPromoCodeStatus] = useState(null);

  const timeSlots = [
    "6:00 - 8:00", "8:00 - 11:00", "11:00 - 14:00",
    "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00",
  ];


  // UseEffetc for fetching availability of all admins that are suitablefor the selected course 
  useEffect(() => {
    if (!selectedTime) return;
    fetch(
      `http://localhost:2020/api/subject-courses/available-days?courseId=${courseId}&hour=${selectedTime.trim()}`
    )
      .then((response) => response.json())
      .then((data) => setAvailableDays(data))
      .catch((err) => console.log(err.message));
  }, [selectedTime, courseId]);

  // UseEffect for checking if promo code is valid
  useEffect(() => {
    if (!promoCode) {
      setPromoCodeStatus(null);
      setLoadingPromoCode(false);
      return;
    }

    setLoadingPromoCode(true);
    const timer = setTimeout(() => {
      fetch(
        `http://localhost:2020/api/discount-code/check-promo-code?email=Tester&promoCode=${promoCode}&subjectId=${courseId}`
      )
        .then((response) => {
          setLoadingPromoCode(false);
          setPromoCodeStatus(response.ok ? "valid" : "invalid");
        })
        .catch(() => {
          setLoadingPromoCode(false);
          setPromoCodeStatus("error");
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, [promoCode, courseId]);

  // Function that handles time slot change
  const handleTimeSelection = (time) => {
    if (selectedDates.length > 0 && !window.confirm(
      "Czy napewno chcesz zmienić godzinę? Usunie to aktualnie wybrane dni."
    )) return;

    setSelectedDates([]);
    setSelectedTime(time);
  };

  // Validates which days are available
  const isDateDisabled = (date) => {
    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 3);

    return (
      date < today || date > threeMonthsLater || !availableDays.includes(date.toLocaleString("en-US", { weekday: "long" }))
    );
  };

  // Adds new date to selected dates
  const handleDateChange = (date) => {
    setSelectedDates((prev) =>
      prev.some((d) => d.getTime() === date.getTime())
        ? prev.filter((d) => d.getTime() !== date.getTime())
        : [...prev, date]
    );
  };

  const handlePayment = () => {
  console.log(selectedTime);
  // Assuming you only want to send one date, not an array
  const courseData = {
    username: username, 
    course_id: courseId,
    // Only send one formatted date instead of an array
    dates: selectedDates.map((date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
      const [startTime, endTime] = selectedTime.split(' - ');
      const [startHour, startMinute] = startTime.split(':');
  
      // Return a single formatted date string instead of an array
      return `${year}-${month}-${day}-${startHour}-${startMinute}`;
    })[0], // Only take the first date if sending a single date
    bonus_info: additionalInfo,
    promo_code: promoCode,
  };

  console.log(JSON.stringify(courseData));

  fetch("http://localhost:2020/api/user/post-course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // Successfully posted course
        alert("Course posted successfully!");
        navigate(`/user/${username}`);
      } else if (data.error) {
        // Handle error response
        alert(`Error: ${data.error}`);
      }
    })
    .catch((error) => {
      console.error("Error during course posting:", error);
      alert("There was an error processing your request.");
    });
};



  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center py-12 px-4 overflow-x-hidden">
      
      {/* Home link */}
      <Link
        to={`/user/${username}`}
        className="absolute top-6 left-6 z-50 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        <FaHome className="w-6 h-6 text-neonblue z-50" />
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Zaplanuj swoje lekcje</h1>

      {/* Time slot selection */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mb-8 ">
        <h2 className="text-xl font-semibold mb-4">Wybierz godzinę:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`px-4 py-2 rounded-lg border text-[17px] transition ${
                selectedTime === slot ? "bg-neonblue text-white border-neonblue shadow-md" 
                : "bg-white text-black border-gray-300 hover:border-neonblue"
              }`}
              onClick={() => handleTimeSelection(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Date selection callendar */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Wybierz dni:</h2>
        <div className="flex justify-center mb-8">
          <DatePicker
            inline
            selected={null}
            onChange={handleDateChange}
            highlightDates={selectedDates}
            dayClassName={(date) =>
              selectedDates.some((d) => d.getTime() === date.getTime())
                ? "bg-neonblue text-white rounded-full"
                : "hover:bg-gray-200 rounded-full"
            }
            filterDate={(date) => !isDateDisabled(date)}
          />
        </div>
        <div className="mt-4">
          {selectedDates.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {selectedDates.map((date, index) => (
                <li key={index} className="bg-neonblue text-white text-center px-4 py-2 rounded-lg">
                  {date.toLocaleDateString("pl-PL")}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nie wybrano żadnej daty</p>
          )}
        </div>
      </div>

      {/* Additional info */}
      <div className="w-full max-w-2xl flex flex-col gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Dodatkowe informacje:</h2>
          <textarea
            className="w-full p-4 border rounded-lg focus:border-neonblue"
            placeholder="Podaj dodatkowe informacje..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </div>

        {/* Promo code */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Kod promocyjny:</h2>
          <input
            type="text"
            className="w-full p-4 border rounded-lg focus:border-neonblue"
            placeholder="Wpisz kod promocyjny"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          {promoCodeStatus === "valid" && <p className="text-green-600 mt-2">Kod poprawny</p>}
          {promoCodeStatus === "invalid" && <p className="text-red-600 mt-2">Niepoprawny kod</p>}
        </div>
      </div>

      {/* Summary section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">Podsumowanie</h2>
        <p className="text-gray-700">Godzina: <span className="text-gray-500">{selectedTime || "Nie wybrano"}</span></p>
        <p className="text-gray-700">Wybrane dni: <span className="text-gray-500">{selectedDates.length ? selectedDates.map(d => d.toLocaleDateString("pl-PL")).join(", ") : "Nie wybrano"}</span></p>
        <p className="text-gray-700 font-bold mt-4">Cena: 200 PLN</p>
        <button 
          className="w-full mt-4 px-4 py-2 bg-neonblue text-white rounded-lg hover:bg-blue-500"
          onClick={handlePayment}
        >
          Przejdź do płatności
        </button>
      </div>
    </div>
  );
};

export default BuyCourse;
