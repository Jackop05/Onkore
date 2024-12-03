import React from 'react'
import HoverLetters from '../../logic/HoverLetters'



const Advantages = () => {
  return (
    <div id="teachers" className='bg-slate-100 text-center mb-10 w-screen h-screen flex flex-col justify-center basic'>
        <div className='bg-white max-w-[1200px] mx-auto rounded-[15px] shadow-lg px-16 py-8 flex gap-12 justify-between'>
          <img className='w-40 h-40 rounded-full self-center' alt="Profile Image" src="../images/noProfileImageMale.png" />
          
          <div className='text-left mr-12'>
            <div className='text-2xl font-bold mb-2 cursor-pointer'>{HoverLetters('Jakub Sztobryn', "neonblue")}</div>
            <div className='flex gap-2'>
              <img src="../images/temporarySubjectIcon.png" alt="Subject Icon" className='w-8 h-8   ' />
              <div className='self-center'>Matematyka</div>
            </div>
            <div className='flex gap-2'>
              <img src="../images/temporarySubjectIcon.png" alt="Subject Icon" className='w-8 h-8   ' />
              <div className='self-center'>Fizyka</div>
            </div>
            <div className='flex gap-2'>
              <img src="../images/temporarySubjectIcon.png" alt="Subject Icon" className='w-8 h-8   ' />
              <div className='self-center'>Angielski</div>
            </div>
            <div className='text-lg mt-2'>Przeprowadził 100+ lekcji</div>
          </div>

          <div className=''>
            <div className='text-2xl font-bold mb-4'>O mnie</div>
            <div className='max-w-[300px] flex flex-col justify-center'>
              Jestem korepetytorem od 3 lat, uwielbiam łyżwy i matematykę. Moje motto to Nie ma bolu, nie ma drożdży.
            </div>
          </div>
        </div>
    </div>
  )
}

export default Advantages