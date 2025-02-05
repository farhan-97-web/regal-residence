/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, text,desc }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[30rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
            {text}
          </h1>
          <p className='text-xl font-light text-white lg:text-2xl'>{desc}</p>
          <br />
          
        </div>
      </div>
    </div>
  )
}

export default Slide
