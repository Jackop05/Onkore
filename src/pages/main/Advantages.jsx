import React from 'react'
import HoverLetters from '../../logic/HoverLetters'



const Advantages = () => {
  return (
    <div id="advantages" className='bg-slate-100 text-center mb-10 w-screen h-screen flex flex-col justify-center basic'>
        <div className='text-[50px] flex gap-4 justify-center mb-4'>Dołącz do <span className='titles font-bold text-[60px] text-neonblue flex cursor-default'>{HoverLetters("onkore")}<span className='text-slate-900'>!</span></span></div>
        <ul className="pl-6 mt-4 mb-24 text-gray-700 list-none flex flex-center mx-auto max-w-[1200px] gap-6 font-semibold text-lg">
            <li>Chcesz poprawić ocenę?</li>
            <li>Nauczyć się na poprawkę?</li>
            <li>Nauczyć sie do egzaminu 8-klasisty?</li>
            <li>Przygotować się do matury podstawowej lub rozszerzonej?</li>
            <li>Przyśpieszyć swoją naukę?</li>
            <li>Rozwijąć się?</li>
          </ul>
          <div className='text-[50px] mb-4'>Co oferujemy?</div>
          <ul className="mt-4 text-gray-700 flex justify-center gap-12 list-none max-w-[1200px] mx-auto font-semibold text-lg">
            <li>Indywidualne oraz grupowe zajęcia.</li>
            <li>Notatki z każych zajęć.</li>
            <li>Indywidualne podejście do każdego ucznia.</li>
            <li>Nasz feedback oraz zalecenia od nauczycieli.</li>
            <li>Przerabianie podręczników, zbiorów zadań oraz przykładowych testów.</li>
          </ul>
    </div>
  )
}

export default Advantages