import React, { useRef, useEffect } from "react";
import HoverLetters from "../../logic/HoverLetters";

const Advantages = () => {
  const questions = [
    "Chcesz poprawić ocenę?",
    "Nauczyć się na poprawkę?",
    "Nauczyć się do egzaminu 8-klasisty?",
    "Przygotować się do matury podstawowej lub rozszerzonej?",
    "Przyśpieszyć swoją naukę?",
    "Rozwijać się?",
    "Znaleźć lepszego nauczyciela?",
  ];

  const offerings = [
    "Indywidualne oraz grupowe zajęcia.",
    "Notatki z każdych zajęć.",
    "Indywidualne podejście do każdego ucznia.",
    "Nasz feedback oraz zalecenia od nauczycieli.",
    "Przerabianie podręczników, zbiorów zadań oraz przykładowych testów.",
  ];

  // Reference for the slider
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e) => {
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseMove = (e) => {
      if (!slider.classList.contains("cursor-grabbing")) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Speed adjustment
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      slider.classList.remove("cursor-grabbing");
    };

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      scrollLeft = slider.scrollLeft;
    };

    const handleTouchMove = (e) => {
      const x = e.touches[0].clientX;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseUp);
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseUp);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div id="advantages" className="bg-slate-100 text-center mb-10 w-full flex flex-col justify-center px-4 md:px-20 py-4 sm:p-10">
      {/* Header Section */}
      <div className="text-[30px] sm:text-[40px] lg:text-[50px] flex gap-4 justify-center mb-4">
        Dołącz do{" "}
        <span className="text-[37px] sm:text-[50px] titles font-bold lg:text-[60px] text-neonblue flex cursor-default">
          {HoverLetters("onkore")}
          <span className="text-slate-900">!</span>
        </span>
      </div>

      {/* Questions Section */}
      <div className="w-full flex justify-center overflow-hidden max-w-[1000px] mx-auto">
        <div
          ref={sliderRef}
          className="flex gap-6 sm:gap-8 text-gray-700 font-semibold text-lg relative mx-auto transition-transform duration-500 overflow-x-auto scrollbar-hide custom-scrollbar"
        >
          {questions.map((question, index) => (
            <div
              key={index}
              className="min-w-[85%] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-white flex flex-col items-center justify-between rounded-lg shadow-lg p-4 sm:p-6"
            >
              <div className="text-center text-lg sm:text-2xl text-gray-800 font-semibold mb-4">{question}</div>
              <img
                src={`/images/questionImages/question${index}.jpg`}
                decoding="async"
                fetchPriority="high"
                alt={`Question ${index}`}
                className="w-[80%] sm:w-64 md:w-72 lg:w-80 h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Offerings Section */}
      <div className="text-[30px] sm:text-[40px] lg:text-[50px] mb-4 mt-10 ">Co oferujemy?</div>
      <div className="w-full flex justify-center overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-6 sm:gap-8 text-gray-700 font-semibold text-lg relative transition-transform duration-500 overflow-x-auto scrollbar-hide max-w-[1000px] mx-auto custom-scrollbar"
        >
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="min-w-[85%] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-white flex flex-col items-center justify-between rounded-lg shadow-lg p-4 sm:p-6"
            >
              <div className="text-center text-lg sm:text-2xl text-gray-800 font-semibold mb-4">{offering}</div>
              <img
                src={`/images/offeringsImages/offering${index}.jpg`}
                decoding="async"
                fetchPriority="high"
                alt={`Offering ${index}`}
                className="w-[80%] sm:w-64 md:w-72 lg:w-80 h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advantages;
