import React from 'react'
import Slider from '../Slider'
import board3 from '../../assets/board3.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import img from "../../assets/slider4.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";

function HomeMiddleBar() {
  const sliderHeight = '200px';
  const images = [
    { img: img, content: "kjhsg sdgkjsdgh skdfg" },
    { img: slider2, content: "kjhsg sdgkjsdgh skdfg" },
    { img: slider3, content: "kjhsg sdgkjsdgh skdfg" },
  ];
  return (
    <div>
         {/* carousel */}
         <div >
         <Slider height={sliderHeight} images={images} />
          </div>
          {/* <div>
            <marquee behavior="smooth" className='text-yellow-300'>We intend to start a competition for our new game of Dynamic Chess</marquee>
          </div> */}
          <div className="grid grid-cols-1">
            <div >
              {/* chess img */}
              <div className="col-span-1 flex justify-center w-full  mt-2">
                <LazyLoadImage src={board3}  alt="" className="md:h-[650px] md:w-[100vw]  max-sm:h-full  " effect='blur'/>
              </div>


            </div>

          </div>
    </div>
  )
}

export default HomeMiddleBar