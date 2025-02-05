import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Card = ({property}) => {
  
  return (
    
      
    <div  className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={property.image}
            alt='Plant Image'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-lg'>Property location :{property.location} </div>
        
        
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>Price Range: {property.price}$</div>
        </div>
        <div className='font-semibold text-lg'>Verfication Status: {property.verificationStatus}</div>
      </div>
      <div>
       <Link to={`/properties/${property._id}`}> <button className="btn">View Details</button></Link>
      </div>
    </div>
  )
}

export default Card
