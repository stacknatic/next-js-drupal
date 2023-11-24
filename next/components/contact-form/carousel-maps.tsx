import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const MapsCarousel = () => {
  const mapIframes = [
    {
      src: "https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Helsinki,Finland",
    },
    {
      src: "https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Tallinn,Estonia",
      title: "Tallinn, Estonia"
    },
    {
      src: "https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Madrid,Spain",
      title: "Madrid, Spain"
    },
    {
      src: "https://www.google.com/maps/embed/v1/place?key=AIzaSyC7J7v9zG1JaOmycYRI8APKIPgg4nKfLLE&q=Poland",
      title: "Poland"
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={300}
      slidesPerView={1}
    >
      {mapIframes.map((iframe, index) => (
        <SwiperSlide key={index}>
          <iframe 
            src={iframe.src}
            title={iframe.title}
            width={600} 
            height={200}
            allowFullScreen>
          </iframe>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MapsCarousel;
