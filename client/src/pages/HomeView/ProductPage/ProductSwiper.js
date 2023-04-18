import React, {useState} from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from "swiper";

export const ProductSwiper = ({src}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    return (
        <div className='app__product_page_content_info_main_img'>
            <Swiper
                zoom={true}
                loop={true}
                spaceBetween={10}
                thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                modules={[Zoom, FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {src.map(img => {
                    return (
                        <SwiperSlide>
                            <div className="swiper-zoom-container">
                                <img src={img}></img>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <div className='app__product_page_bottom_imgs'>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Pagination, Thumbs]}
                    className="mySwiper"
                >
                    {src.map(img => {
                        return (
                            <SwiperSlide className='app__pointer'>
                                <img src={img}></img>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}