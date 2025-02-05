import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../AuthProvider/AuthProvider"


const Details = () => {
  const {user} = useContext(AuthContext)
//  handle wishlist
const handleWishlist = async (wishItem) => {
  console.log(wishItem);
  
  try{
    await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, wishItem)
toast.success('property added to wishlist successfully')
}catch(err){
    console.log(err);
}
  
  
};

// handle review
const handleReview =async e =>{
  e.preventDefault();
  const review = e.target.review.value;
  const reviewGiverName = user?.displayName;
  const reviewGiverEmail = user?.email;
  const reviewGiverImg = user?.photoURL
  const reviewData = {review,reviewGiverName,reviewGiverImg,reviewGiverEmail}
 
  
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/review`, reviewData)
  toast.success('Review added successfully')
  }catch(err){
      console.log(err);
  }
  

          
}




// load data for a specific id

  const {id} = useParams()
  console.log(id);
  // const { data: property = [], isLoading, refetch } = useQuery({
  //   queryKey: ['prop', id],
  //   queryFn: async () => {
  //     const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`);
  //     return data;
  //   },
  // });

  const { data: building = [], isLoading, isError, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/property/${id}`);
      
      return data;
    },
  });
  
  if (isError) {
    console.error("Error fetching data:", error);
  }
  
  console.log(building);
  
const wishData = {building,UserEmail:user?.email}

  return (
  
      
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={building?.image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <h1 className="text-xl">{building?.propertyName}</h1>
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            Location : {building?.location}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            <div>Agent Name: {building?.agent?.aName}</div>

           
          </div>
          <hr className='my-6' />
         
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {building?.price}$</p>
            
          </div>
          <hr className='my-6' />
          <div>
            <button onClick={()=>handleWishlist(wishData)} className="btn">Add to Wishlist</button>
          </div>

          <div className="flex flex-col gap-6 w-full">
         <form onSubmit={handleReview}>
         <input className="textarea textarea-bordered w-full" type="text" name="review"/>
         <button className="btn w-1/5">Add a review</button>
         </form>
  

          </div>

          

          
        </div>
      </div>
  
  )
}

export default Details
