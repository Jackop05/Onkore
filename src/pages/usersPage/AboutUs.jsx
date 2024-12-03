import React from 'react'
import HoverLetters from '../../logic/HoverLetters'

const AboutUs = () => {
  return (
    <div id="about-us" className="bg-slate-50 mt-[50px] text-center mb-10 w-screen h-screen flex flex-col justify-center basic">
        <div className="mx-auto">
          <h2 className="text-[80px] text-neonblue font-bold drop-shadow-lg mb-6 cursor-default titles">
            {HoverLetters("O nas")}
          </h2>
          <div className="text-gray-800 text-3xl mx-auto mb-4 max-w-[600px]">Jesteśmy zespołem doświadczonych nauczycieli, którzy wierzą, że każdy ma swój sposób nauki.</div>
          <div className="text-gray-800 text-3xl mx-auto max-w-[600px]">Nasza platforma łączy nowoczesne technologie z indywidualnym podejściem do każdego ucznia.</div>
        </div>
    </div>
  )
}

export default AboutUs