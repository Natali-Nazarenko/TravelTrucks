'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import { ImageGallery } from '@/types/camper';

import css from './CamperGallery.module.css';

interface CamperGalleryProps {
    gallery: ImageGallery[];
    camperName: string;
}

function CamperGallery({ gallery, camperName }: CamperGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    if (!gallery || CamperGallery.length)
        return (
            <div className={css.camper__images__block}>
                <Swiper
                    modules={[Thumbs, Navigation]}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    navigation={true}
                    className={css.main__slider}
                >
                    {gallery.map((img, index) => (
                        <SwiperSlide key={`main-${index}`}>
                            <Image
                                className={css.main__image}
                                src={img.original}
                                alt={`Main view of ${camperName}`}
                                width={638}
                                height={505}
                                priority={index === 0}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs]}
                    slidesPerView={4}
                    spaceBetween={32}
                    watchSlidesProgress={true}
                    className={css.thumbs__slider}
                >
                    {gallery.map((img, index) => (
                        <SwiperSlide key={`thumb-${index}`} className={css.thumb__slide}>
                            <Image
                                className={css.secondary__image}
                                src={img.thumb}
                                alt={`Thumbnail ${index + 1} of ${camperName}`}
                                width={136}
                                height={144}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
}

export default CamperGallery;
