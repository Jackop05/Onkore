import React from 'react'
import HoverLetters from '../../logic/HoverLetters'



const Hero = () => {
  return (
    <div className='bg-slate-50 relative text-center w-screen h-screen flex flex-col justify-center top-16 basic'>
        <div className='max-w-[700px] mx-auto'>
            <div className="font-bold text-neonblue drop-shadow-lg mb-10 titles">
                <div className='text-[80px]'>
                    {HoverLetters("Onkore")}
                </div>
                
                <div className='text-slate-900 text-[40px] relative bottom-4'>
                    {HoverLetters("Online Korepetycje")}
                </div>
            </div>
            <p className="text-[24px] text-gray-800 font-medium mb-10 max-w-[550px] mx-auto">Profesjonalne korepetycje online z najlepszymi nauczycielami. Ucz się w swoim tempie i odkryj swój potencjał z nami!</p>
            <button className="w-full text-white py-3 rounded-lg bg-neonblue shadow-sm transition-all duration-150 hover:scale-105 max-w-[350px]">
                <div className="drop-shadow-md text-xl">Zapisz się na zajęcia!</div>
            </button>
        </div>
    </div>
  )
}

export default Hero