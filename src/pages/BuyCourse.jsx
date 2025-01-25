import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BuyCourse = () => {
  const { courseId } = useParams();

  const [availableDays, setAvailableDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeStatus, setPromoCodeStatus] = useState(null); // For promo code feedback
  const [loadingPromoCode, setLoadingPromoCode] = useState(false); // For showing the loading spinner
  const [error, setError] = useState(null);

  // Fetch available days when selected time changes
  useEffect(() => {
    if (!selectedTime) return;

    fetch(
      `http://localhost:2020/api/subject-courses/available-days?courseId=${courseId}&hour=${selectedTime?.trim()}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAvailableDays(data))
      .catch((err) => setError(err.message));
  }, [selectedTime, courseId]);

  // Debounced fetch for promo code validation
  useEffect(() => {
    if (!promoCode) {
      setPromoCodeStatus(null); // Clear feedback if promo code is empty
      setLoadingPromoCode(false);
      return;
    }

    setLoadingPromoCode(true); // Show loading spinner
    const timer = setTimeout(() => {
      fetch(
        `http://localhost:2020/api/discount-code/check-promo-code?email=Tester&promoCode=${promoCode}&subjectId=${courseId}`
      )
        .then((response) => {
          setLoadingPromoCode(false); // Hide loading spinner
          if (response.ok) {
            setPromoCodeStatus("valid"); // Promo code is valid
          } else {
            setPromoCodeStatus("invalid"); // Promo code is invalid
          }
        })
        .catch(() => {
          setLoadingPromoCode(false); // Hide loading spinner
          setPromoCodeStatus("error");
        });
    }, 3000); // Wait for 3 seconds after the user stops typing

    return () => clearTimeout(timer); // Cleanup the previous timer on change
  }, [promoCode, courseId]);

  const timeSlots = [
    "6:00 - 8:00",
    "8:00 - 11:00",
    "11:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
  ];

  const handleTimeSelection = (time) => {
    if (selectedDates.length > 0) {
      const isConfirmed = window.confirm(
        "Czy napewno chcesz zmienić godzinę? Usunie to aktualnie wybrane dni."
      );
      if (isConfirmed) {
        setSelectedDates([]);
      }
    }
    setSelectedTime(time);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

    return (
      date < today || date > threeMonthsLater || !availableDays.includes(dayOfWeek)
    );
  };

  const handleDateChange = (date) => {
    if (selectedDates.some((d) => d.getTime() === date.getTime())) {
      setSelectedDates(selectedDates.filter((d) => d.getTime() !== date.getTime()));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  return (
    <div className="w-screen bg-gray-100 flex flex-col items-center py-16 relative basic">
      <h1 className="text-5xl font-bold mb-12 titles">Zaplanuj swoje lekcje</h1>

      {/* Time Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mb-8">
        <h2 className="text-xl font-semibold mb-4">Która godzina jest dla Ciebie odpowiednia?</h2>
        <div className="flex gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`px-6 py-3 rounded-lg border-2 text-[17px] ${
                selectedTime === slot
                  ? "bg-neonblue text-white border-neonblue shadow-md"
                  : "bg-white text-black border-gray-300"
              } hover:border-neonblue hover:shadow-md`}
              onClick={() => handleTimeSelection(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] flex gap-32">
        <div>
          <h2 className="text-xl font-semibold mb-4">Wybierz dni na najbliższe 3 miesiące:</h2>
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
        <div className="h-full">
          <h3 className="text-xl font-semibold mb-4">Wybrane dni:</h3>
          {selectedDates.length === 0 && (
            <div className="text-gray-700">Nie wybrano żadnej daty</div>
          )}
          <ul className="mt-2 flex flex-wrap gap-6 max-w-[40vw]">
            {selectedDates.map((date, index) => (
              <li
                key={index}
                className="rounded-3xl bg-neonblue max-w-[500px] text-center px-8 py-2 text-white text-xl self-center"
              >
                {date.toLocaleDateString("pl-PL")}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
      {/* Additional Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mt-8">
        <h2 className="text-xl font-semibold mb-4">Dodatkowe informacje</h2>
        <textarea
          className="w-full p-4 border-2 rounded-lg focus:outline-none focus:border-neonblue"
          placeholder="Podaj dodatkowe informacje, takie jak dokładna godzina dostępności, czy konkretnego korepetytora z którym chciałbyś mieć zajęcia..."
          value={additionalInfo}
          maxLength={800}
          onChange={(event) => setAdditionalInfo(event.target.value)}
        />
      </div>

      {/* Promo Code Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mt-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold">Kod promocyjny</h2>
          {loadingPromoCode && (
            <svg
              className="animate-spin ml-2 h-5 w-5 text-neonblue"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
        </div>
        {promoCodeStatus === "valid" && <div className="text-green-600 mb-4">Poprawny kod</div>}
        {promoCodeStatus === "invalid" && <div className="text-red-600 mb-4">Niepoprawny kod</div>}
        {promoCodeStatus === "error" && (
          <div className="text-red-600 mb-4">Wystąpił błąd podczas weryfikacji kodu</div>
        )}
        <input
          type="text"
          className="w-full p-4 border-2 rounded-lg focus:outline-none focus:border-neonblue"
          placeholder="Wpisz kod promocyjny"
          value={promoCode}
          maxLength={30}
          onChange={handlePromoCodeChange}
        />
      </div>

      {/* Summary Section */}
      <div className="fixed top-[30%] right-[5vw] bg-white shadow-xl p-6 text-lg rounded-lg w-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Podsumowanie</h2>
        <p className="text-gray-700 mb-2 text-[21px]">
          Godzina:<span className="text-gray-500 ml-4 text-lg">{selectedTime || "Nie wybrano"}</span>
        </p>
        <p className="text-gray-700 mb-2 text-[21px]">
          Wybrane dni:
          <span className="text-gray-500 ml-4 text-lg">
            {selectedDates.length > 0
              ? selectedDates.map((d) => d.toLocaleDateString("pl-PL")).join(", ")
              : "Nie wybrano"}
          </span>
        </p>
        <p className="text-gray-700 mb-2 text-[21px] flex flex-wrap">
          <span className="mr-4">Kod promocyjny:</span>
          <span className="text-gray-500 text-lg">{promoCode || "--"}</span>
        </p>
        <p className="text-gray-700 font-bold mt-4">Cena: 200 PLN</p>
        <button className="w-full mt-4 px-4 py-2 bg-neonblue text-white rounded-lg hover:bg-blue-500">
          Przejdź do płatności
        </button>
      </div>
    </div>
  );
};

export default BuyCourse;
