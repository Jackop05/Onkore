import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-white relative text-center mb-10 w-screen h-screen flex flex-col justify-center">
        <div className="mb-10">
          <h2 className="text-[36px] text-neonblue font-bold drop-shadow-lg mb-6">
            O nas
          </h2>
          <p className="text-gray-800 font-medium">
            Jesteśmy zespołem doświadczonych nauczycieli, którzy wierzą, że każdy ma swój sposób nauki. Nasza platforma łączy nowoczesne technologie z indywidualnym podejściem do każdego ucznia.
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Indywidualne podejście</li>
            <li>Elastyczne godziny</li>
            <li>Doświadczeni nauczyciele</li>
            <li>Przystępne ceny</li>
          </ul>
        </div>
    </div>
  )
}

export default AboutUs