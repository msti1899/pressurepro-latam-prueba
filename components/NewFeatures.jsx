import React from 'react'
import Image from 'next/image';

const NewFeatures = ({ imgUrl, title, subtitle }) => {
  return (
    <div className='flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]'>
      <div className='flex justify-center items-center w-[70px] h-[70px] rounded-[24px] bg-[#323f5d] relative'>
        <Image
          src={imgUrl}
          alt={`Icono ${title} - Sistema TPMS PressurePro`}
          width={35}
          height={35}
          loading="lazy"
          className='object-contain'
        />
      </div>
      <h3 className='mt-[26px] font-bold text-[24px] leading-[30px] text-white'>{title}</h3>
      <p className='flex-1 mt-[16px] font-normal text-[18px] text-[#b0b0b0] leading-[32px]'>{subtitle}</p>
    </div>
  )
}

export default NewFeatures
