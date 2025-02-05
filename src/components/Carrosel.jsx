// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'


import bgimg1 from '../assets/slide1.jpg'
import bgimg2 from '../assets/slide2.jpg'
import bgimg3 from '../assets/slide3.jpg'
import Slide from './Slide'


export default function Carousel() {
  return (
    <div className='container px-6 py-10 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text='Find Your Dream Home'
            desc={'Discover the perfect place to live, work, and grow.'}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text='Your Gateway to Prime Properties'
            desc={'Explore exclusive listings in top locations at unbeatable prices.'}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text='Seamless Property Buying & Selling'
            desc={'Experience hassle-free transactions with trusted real estate experts.'}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
