import React from 'react';
import HoverLetters from '../../logic/HoverLetters';

const AboutUs = () => {
  return (
    <div
      id="about-us"
      className="bg-gradient-to-b from-slate-50 via-white to-slate-100 mt-[50px] text-center mb-10 w-screen h-screen flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-[800px] p-6">
        <h2
          className="text-[80px] text-neonblue font-extrabold drop-shadow-lg mb-6 cursor-default titles tracking-wide hover:scale-105 transition-transform duration-300"
        >
          {HoverLetters("O nas")}
        </h2>
        <div
          className="text-gray-800 text-3xl mx-auto mb-6 max-w-[700px] leading-relaxed tracking-wide shadow-md p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200"
        >
          Jesteśmy zespołem doświadczonych nauczycieli, którzy wierzą, że każdy ma swój sposób nauki.
        </div>
        <div
          className="text-gray-800 text-3xl mx-auto max-w-[700px] leading-relaxed tracking-wide shadow-md p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200"
        >
          Nasza platforma łączy nowoczesne technologie z indywidualnym podejściem do każdego ucznia.
        </div>
        <div
          className="mt-8 flex justify-center items-center gap-4 animate-bounce"
        >
          <a
            href="#contact"
            className="text-lg text-white bg-neonblue py-3 px-6 rounded-lg shadow-lg hover:bg-neondarkblue transition-colors duration-300"
          >
            Skontaktuj się z nami
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
