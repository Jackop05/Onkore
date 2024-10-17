import React from 'react'

const Hero = () => {
  return (
    <div className='bg-slate-50 relative text-center w-screen h-screen flex flex-col justify-center'>
        <div className='max-w-[700px] mx-auto'>
            <div className="text-[50px] font-bold text-neonblue drop-shadow-lg mb-4">
                {Array.from('Onkore').map((letter, index) => (
                    <span key={index} className="hover:text-neongreen transition-all duration-100 cursor-default ">
                        {letter === ' ' ? '\u00A0' : letter}
                    </span>
                ))}
                <span className='mx-4 cursor-default text-slate-700'>~</span> 
                {Array.from('Online korepetycje').map((letter, index) => (
                    <span key={index} className="hover:text-neongreen transition-all duration-100 cursor-default ">
                        {letter === ' ' ? '\u00A0' : letter}
                    </span>
                ))}
            </div>
            <p className="text-[24px] text-gray-800 font-medium mb-10 max-w-[500px] mx-auto">Profesjonalne korepetycje online z najlepszymi nauczycielami. Ucz się w swoim tempie i odkryj swój potencjał z nami!</p>
            <button className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105 max-w-[350px]">
                <div className="drop-shadow-md text-xl">Zapisz się na zajęcia!</div>
            </button>
        </div>
    </div>
  )
}

export default Hero