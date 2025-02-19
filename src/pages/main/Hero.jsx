import React from 'react';
import HoverLetters from '../../logic/HoverLetters';
import ScrollToSection from '../../logic/ScrollToSection';



const Hero = () => {
    return (
        <div id="hero" className="relative text-center w-screen h-[80vh] mb-[20vh] flex flex-col justify-center top-16 basic md:pt-32 px-4 md:px-8">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('/images/background-main.png')] bg-cover bg-center filter blur-md h-full"></div>

            {/* First view content */}
            <div className="relative z-10 max-w-[90%] md:max-w-[700px] mx-auto bg-white rounded-3xl px-4 md:px-20 py-10 md:py-12 shadow-lg">
                <div className="font-bold text-neonblue drop-shadow-lg mb-6 md:mb-10 titles">
                    <div className="text-[48px] sm:text-[64px] md:text-[80px]">{HoverLetters("Onkore")}</div>

                    <div className="text-slate-900 text-[24px] sm:text-[32px] md:text-[40px] relative bottom-2 md:bottom-4">
                        {HoverLetters("Online Korepetycje")}
                    </div>
                </div>
                <p className="text-[16px] sm:text-[20px] md:text-[24px] text-gray-800 font-medium mb-8 md:mb-10 max-w-[90%] sm:max-w-[550px] mx-auto">
                    Profesjonalne korepetycje online z najlepszymi nauczycielami. Ucz się w swoim tempie i odkryj swój potencjał z nami!
                </p>
                <button
                    className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105 max-w-[250px] sm:max-w-[300px] md:max-w-[350px] mx-auto"
                    onClick={() => ScrollToSection('offers')}
                >
                    <div className="drop-shadow-md text-lg sm:text-xl">Zapisz się na kurs!</div>
                </button>
            </div>
        </div>
    );
};

export default Hero;
