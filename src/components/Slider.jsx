import React from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import img from "../assets/slider4.jpg";
// import slider2 from "../assets/slider2.jpg";
// import slider3 from "../assets/slider3.jpg";

const Slider = (props) => {
  const { height, eventDetails ,images}=props
  // console.log(images)
  // const bannerMap = [
  //   { "img": img, content: "kjhsg sdgkjsdgh skdfg" },
  //   { "img": slider2, content: "kjhsg sdgkjsdgh skdfg" },
  //   { "img": slider3, content: "kjhsg sdgkjsdgh skdfg" },
  // ];

  return (
    <div>
      <section className="text-gray-600 body-font bg-slate-200 flex justify-center overflow-hidden">
        <OwlCarousel
          className="owl-theme"
          loop={true}
          margin={0}
          autoplay={true}
          autoplayTimeout={3000}
          autoplaySpeed={2000}
          items={1}
          dots={false}
          nav={false}
          responsive={{
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
          }}
        >
          {images.map((item, index) =>
            <div key={index} className='relative rounded-md'>
              <img loading='lazy' className="w-full rounded-md" style={{ height: height }} src={item.img} alt="" />
              {eventDetails && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
                  <div>
                    {eventDetails.split('\n').map((line, i) => (
                      <p key={i} className="text-4xl font-semibold  text-white  ">{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </OwlCarousel>
      </section>
    </div>
  );
};

export default Slider;
