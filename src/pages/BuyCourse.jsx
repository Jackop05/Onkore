import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BuyCourse = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const timeSlots = [
    "6:00 - 8:00",
    "8:00 - 11:00",
    "11:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
  ];

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);
    return date < today || date > threeMonthsLater;
  };

  const handleDateChange = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d.getTime() !== date.getTime()));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  return (
    <div className="w-screen bg-gray-100 flex flex-col items-center py-16 relative">
      <h1 className="text-5xl font-bold mb-12 titles">Zaplanuj swoje lekcje</h1>

      {/* Time Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mb-8">
        <h2 className="text-xl font-semibold mb-4">Która godzina jest dla Ciebie odpowiednia?</h2>
        <div className="flex gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`px-6 py-3 rounded-lg border-2 ${
                selectedTime === slot ? "bg-neonblue text-white border-neonblue" : "bg-white text-black border-gray-300"
              } hover:border-neonblue hover:text-neonblue`}
              onClick={() => handleTimeSelection(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Wybierz dni na najbliższe 3 miesiące:</h2>
        <DatePicker
          inline
          selected={null}
          onChange={handleDateChange}
          highlightDates={selectedDates}
          dayClassName={(date) =>
            selectedDates.some((d) => d.getTime() === date.getTime())
              ? "bg-neonblue text-white rounded-full"
              : ""
          }
          filterDate={(date) => !isDateDisabled(date)}
        />
        <div className="mt-4">
          <h3 className="text-lg font-medium">Wybrane dni:</h3>
          <ul className="mt-2">
            {selectedDates.map((date, index) => (
              <li key={index} className="text-gray-700">
                {date.toLocaleDateString("pl-PL")}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mt-8">
        <h2 className="text-xl font-semibold mb-4">Dodatkowe informacje</h2>
        <textarea
          className="w-full p-4 border rounded-lg focus:outline-none focus:border-neonblue"
          placeholder="Podaj dodatkowe informacje, takie jak dokładna godzina dostępności..."
          value={additionalInfo}
          onChange={(event) => setAdditionalInfo(event.target.value)}
        />
      </div>

      {/* Promo Code Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-[80%] mt-8">
        <h2 className="text-xl font-semibold mb-4">Kod promocyjny</h2>
        <input
          type="text"
          className="w-full p-4 border rounded-lg focus:outline-none focus:border-neonblue"
          placeholder="Wpisz kod promocyjny"
          value={promoCode}
          onChange={handlePromoCodeChange}
        />
      </div>

      {/* Confirm Button */}
      <div className="mt-8">
        <button
          className="px-8 py-4 bg-neongreen text-black font-semibold text-lg rounded-lg hover:bg-green-500"
          onClick={() => alert(`Godzina: ${selectedTime}, Dni: ${selectedDates.map((d) => d.toLocaleDateString("pl-PL")).join(", ")}, Informacje dodatkowe: ${additionalInfo}, Kod promocyjny: ${promoCode}`)}
        >
          Zatwierdź lekcje
        </button>
      </div>

      {/* Floating Payment Box */}
      <div className="fixed top-[30%] right-10 bg-white shadow-lg p-6 rounded-lg w-[300px]">
        <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>
        <p className="text-gray-700 mb-2">Godzina: {selectedTime || "Nie wybrano"}</p>
        <p className="text-gray-700 mb-2">Wybrane dni: {selectedDates.length > 0 ? selectedDates.map((d) => d.toLocaleDateString("pl-PL")).join(", ") : "Nie wybrano"}</p>
        <p className="text-gray-700 mb-2">Kod promocyjny: {promoCode || "Brak"}</p>
        <p className="text-gray-700 font-bold mt-4">Cena: 200 PLN</p>
        <button className="w-full mt-4 px-4 py-2 bg-neonblue text-white rounded-lg hover:bg-blue-500">
          Przejdź do płatności
        </button>
      </div>
    </div>
  );
};

export default BuyCourse;