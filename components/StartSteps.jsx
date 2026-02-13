import React from 'react'

const StartSteps = ({ number, text }) => {
  return (
    <div className='flex justify-center items-center flex-row group'>
      <div className='flex justify-center items-center w-[70px] h-[70px] rounded-[24px] bg-[#323f5d] group-hover:bg-[#455475] transition-colors duration-300 group-hover:scale-105 transform'>
        <p className='font-bold text-[20px] text-white'>0{number}</p>
      </div>
      <h3 className='flex-1 ml-[30px] font-normal text-[18px] text-gray-300 leading-[32px] group-hover:text-white transition-colors duration-300'>
        {text}
      </h3>
    </div>
  )
}

export default StartSteps
