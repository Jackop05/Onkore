import React from 'react';
import HoverLetters from '../../logic/HoverLetters';

const Hero = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="hero" className="relative text-center w-screen h-[80vh] flex flex-col justify-center top-16 basic mb-52">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-[url('./images/background-main.png')] bg-cover bg-center filter blur-md h-[80vh]"></div>

            {/* Foreground Content */}
            <div className="relative z-10 max-w-[700px] mx-auto bg-white rounded-3xl px-20 py-12 shadow-lg">
                <div className="font-bold text-neonblue drop-shadow-lg mb-10 titles">
                    <div className="text-[80px]">{HoverLetters("Onkore")}</div>

                    <div className="text-slate-900 text-[40px] relative bottom-4">
                        {HoverLetters("Online Korepetycje")}
                    </div>
                </div>
                <p className="text-[24px] text-gray-800 font-medium mb-10 max-w-[550px] mx-auto">
                    Profesjonalne korepetycje online z najlepszymi nauczycielami. Ucz się w swoim tempie i odkryj swój potencjał z nami!
                </p>
                <button
                    className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105 max-w-[350px]"
                    onClick={() => scrollToSection('offers')}
                >
                    <div className="drop-shadow-md text-xl">Zapisz się na kurs!</div>
                </button>
            </div>
        </div>
    );
};

export default Hero;
