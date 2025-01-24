import React, { useState } from "react";
import HoverLetters from "../../logic/HoverLetters";

const Advantages = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [offeringIndex, setOfferingIndex] = useState(1);

  const questions = [
    "Chcesz poprawić ocenę?",
    "Nauczyć się na poprawkę?",
    "Nauczyć sie do egzaminu 8-klasisty?",
    "Przygotować się do matury podstawowej lub rozszerzonej?",
    "Przyśpieszyć swoją naukę?",
    "Rozwijąć się?",
    "Znaleźć lepszego nauczyciela?",
  ];

  const offerings = [
    "Indywidualne oraz grupowe zajęcia.",
    "Notatki z każych zajęć.",
    "Indywidualne podejście do każdego ucznia.",
    "Nasz feedback oraz zalecenia od nauczycieli.",
    "Przerabianie podręczników, zbiorów zadań oraz przykładowych testów.",
  ];

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <div
        key={index}
        className="min-w-[400px] py-6 bg-white flex flex-col items-center justify-between rounded-lg shadow-lg"
      >
        <div className="text-center text-2xl text-gray-800 font-semibold mb-4">
          {question}
        </div>
        <img
          src={`../../images/questionImages/question${index}.jpg`}
          alt="Question image"
          className="w-80 h-auto rounded-md"
        />
      </div>
    ));
  };

  const renderOfferings = () => {
    return offerings.map((offering, index) => (
      <div
        key={index}
        className="min-w-[400px] py-6 bg-white flex flex-col items-center justify-between rounded-lg shadow-lg"
      >
        <div className="text-center text-2xl text-gray-800 font-semibold mb-4">
          {offering}
        </div>
        <img
          src={`../../images/offeringsImages/offering${index}.jpg`}
          alt="Question image"
          className="w-80 h-auto rounded-md"
        />
      </div>
    ));
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevQuestion = () => {
    setQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : questions.length - 1
    );
  };

  const handleNextOffering = () => {
    setOfferingIndex((prevIndex) =>
      prevIndex < offerings.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevOffering = () => {
    setOfferingIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : offerings.length - 1
    );
  };

  return (
    <div
      id="advantages"
      className="bg-slate-100 text-center mb-10 w-screen h-screen flex flex-col justify-center basic"
    >
      {/* Header Section */}
      <div className="text-[50px] flex gap-4 justify-center mb-4 ">
        Dołącz do{" "}
        <span className="titles font-bold text-[60px] text-neonblue flex cursor-default">
          {HoverLetters("onkore")}
          <span className="text-slate-900">!</span>
        </span>
      </div>

      {/* Questions Section */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrevQuestion}
          className="h-16 w-16 self-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ◀
        </button>

        <div className="relative w-[700px] overflow-hidden">
          <div
            className="flex gap-10 mt-4 mb-12 text-gray-700 font-semibold text-lg relative mx-auto transition-all duration-500"
            style={{
              left: "150px",
              transform: `translateX(-${440 * questionIndex}px)`,
            }}
          >
            {renderQuestions()}
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          className="h-16 w-16 self-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      {/* Offerings Section */}
      <div className="text-[50px] mb-4 mt-10">Co oferujemy?</div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrevOffering}
          className="h-16 w-16 self-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ◀
        </button>

        <div className="relative w-[700px] overflow-hidden">
          <div
            className="flex gap-10 mt-4 mb-12 text-gray-700 font-semibold text-lg relative mx-auto transition-all duration-500"
            style={{
              left: "150px",
              transform: `translateX(-${440 * offeringIndex}px)`,
            }}
          >
            {renderOfferings()}
          </div>
        </div>

        <button
          onClick={handleNextOffering}
          className="h-16 w-16 self-center bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Advantages;
