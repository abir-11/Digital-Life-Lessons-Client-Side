import React from 'react';

// new Swiper import
import { Swiper, SwiperSlide } from 'swiper/react';

// must include styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/autoplay';

import hero1 from '../../assets/HeroImg/motivational-hd-image-giving-strength-646rnlru3b3md1pu.jpg';
import hero2 from '../../assets/HeroImg/1740963018565.jpg';
import hero3 from '../../assets/HeroImg/pexels-prateekkatyal-2740956.jpg';

import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules';
import Loading from './../Share/Loading/Loading';
import useAuth from '../../Hooks/useAuth';

const Home = () => {
    const {loading}=useAuth();
    if (loading) {
    return (
      <p className="text-xl text-primary flex justify-center items-center">
        Loading...
      </p>
    );
  }
    return (
        <div>
            <div>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    speed={800}
                    parallax={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Parallax, Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >

                    <div
                        slot="container-start"
                        className="parallax-bg"
                        data-swiper-parallax="-23%"
                    ></div>

                    {/* Slide 1 */}
                    <SwiperSlide style={{
                        backgroundImage: `url(${hero1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        backgroundRepeat: 'no-repeat',
                        height: '80vh'
                    }}>
                        <div className="w-full h-full bg-black/50 flex flex-col justify-center items-start text-start text-white px-6">

                            <div
                                className="text-4xl  lg:text-5xl font-bold mb-4 drop-shadow-lg"
                                data-swiper-parallax="-300"
                            >
                                Wake Up With Determination
                            </div>

                            <div
                                className="text-xl md:text-2xl font-medium mb-6 text-gray-200"
                                data-swiper-parallax="-200"
                            >
                                Success doesn’t need perfection, it needs consistency
                            </div>

                            <div
                                className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300"
                                data-swiper-parallax="-100"
                            >
                                <p>
                                    Every decision you take shapes your professional journey.
                                    Focused effort and continuous learning make you irreplaceable.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>


                    {/* Slide 2 */}
                    <SwiperSlide style={{
                        backgroundImage: `url(${hero3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '80vh'
                    }}>
                        <div className="w-full h-full bg-black/50 flex flex-col justify-center items-start text-start text-white px-6">

                            <div
                                className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg"
                                data-swiper-parallax="-300"
                            >
                                You Wish You Had Met Earlier
                            </div>

                            <div
                                className="text-xl md:text-2xl font-medium mb-6 text-gray-200"
                                data-swiper-parallax="-200"
                            >
                                Small habits compound into lifelong transformation.
                            </div>

                            <div
                                className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300"
                                data-swiper-parallax="-100"
                            >
                                <p>
                                    Personal growth begins when you stop comparing and start improving.Your future can be shaped by habits, mindset, and discipline.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>


                    {/* Slide 3 */}
                    <SwiperSlide style={{
                        backgroundImage: `url(${hero2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '80vh'
                    }}>
                        <div className="w-full h-full bg-black/50 flex flex-col justify-center items-start text-start text-white px-6">

                            <div
                                className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg"
                                data-swiper-parallax="-300"
                            >
                                Your Career Is Built By Choices, Not Chances
                            </div>

                            <div
                                className="text-xl md:text-2xl font-medium mb-6 text-gray-200"
                                data-swiper-parallax="-200"
                            >
                                A strong network is often worth more than a perfect resume
                            </div>

                            <div
                                className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-300"
                                data-swiper-parallax="-100"
                            >
                                <p>
                                    Every decision you take shapes your professional journey.
                                    Focused effort and continuous learning make you irreplaceable.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default Home;
