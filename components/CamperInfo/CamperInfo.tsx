'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CamperDetails } from '@/types/camper';
import css from './CamperInfo.module.css';
import { Review } from '@/types/review';
import { Icon } from '../Icon/Icon';
import ReviewItem from '../ReviewItem/ReviewItem';
import BookingSection from '../BookingSection/BookingSection';
import CamperGallery from '../CamperGallery/CamperGallery';

const Modal = dynamic(() => import('@/components/Modal/Modal'), { ssr: false });

type CamperInfoProps = {
    camper: CamperDetails;
    reviews: Review[];
};

type ModalState = {
    isOpen: boolean;
    text: {
        title: string;
        paragraph: string;
    };
    type: 'loading' | 'success';
};

function CamperInfo({ camper, reviews }: CamperInfoProps) {
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        text: { title: '', paragraph: '' },
        type: 'loading',
    });

    const [isBooked, setisBooked] = useState(false);

    const formatLocation = (location: string) => {
        if (!location) return '';
        const parts = location.split(',').map(part => part.trim());
        if (parts.length < 2) return parts[0];
        return `${parts[1]}, ${parts[0]}`;
    };

    const formatCharacForm = (charac: string) => {
        if (!charac) return '';
        const parts = charac.split('_').map(part => part.trim());
        if (parts.length < 2) return parts[0][0].toUpperCase();
        return `${parts[0][0].toUpperCase()}${parts[0].slice(1)} ${parts[1]}`;
    };

    const formatCharacSize = (size: string) => {
        if (!size) return '';
        return `${size.trim().slice(0, -1)} ${size.trim().slice(-1)}`;
    };

    const formatCharacConsumption = (consum: string) => {
        if (!consum) return '';
        const parts = consum.split('/').map(part => part.trim());
        if (parts.length < 2) return parts[0];
        return `${formatCharacSize(parts[0])} / ${parts[1]}`;
    };

    const handleBookingInProcess = () => {
        setModal({
            isOpen: true,
            text: {
                title: 'Please wait...',
                paragraph: 'We are booking your favourite camper.',
            },
            type: 'loading',
        });
    };

    const handleBookingSuccess = (serverMessage: string) => {
        setModal({
            isOpen: true,
            text: {
                title: 'Success!',
                paragraph: serverMessage,
            },
            type: 'success',
        });
        setisBooked(true);
        setTimeout(() => {
            setModal({
                isOpen: false,
                text: { title: '', paragraph: '' },
                type: 'loading',
            });
        }, 2000);
    };

    return (
        <section className={`container ${css.container}`}>
            {modal.isOpen && <Modal text={modal.text} type={modal.type} />}
            <div className={css.camper__info__block}>
                <CamperGallery gallery={camper.gallery} camperName={camper.name} />
                <div className={css.camper__details}>
                    <div className={css.camper__description}>
                        <div>
                            <h2>
                                {camper.name}
                                {isBooked && <span className={css.booked__badge}> (booked)</span>}
                            </h2>
                            <div className={css.item__rating}>
                                <Icon
                                    name="icon-star"
                                    sizeWidth={18}
                                    className={css.rating__star}
                                />
                                <div className={css.rating__details}>
                                    {`${camper.rating}(${camper.totalReviews} Reviews)`}
                                </div>
                                <div className={css.item__location}>
                                    <Icon name="icon-map" sizeWidth={16} />
                                    <span>{formatLocation(camper.location)}</span>
                                </div>
                            </div>
                            <p className={css.car__price}>
                                <Icon name="icon-euro" sizeWidth={18} />
                                {`${camper.price}`}
                            </p>
                        </div>
                        <p className={css.car__description}>{camper.description}</p>
                    </div>
                    <div className={css.camper__oprions}>
                        <h2>Vehicle details</h2>
                        <div className={css.camper__block__amenities}>
                            {camper.amenities.map((ev, index) => (
                                <div key={`${camper.id}-${index}`} className={css.camper__amenity}>
                                    {`${ev[0].toUpperCase()}${ev.slice(1)}`}
                                </div>
                            ))}
                        </div>
                        <div className={css.line}></div>
                        <ul className={css.camper__characteristics}>
                            <li className={css.charac__item}>
                                <span className={css.charac__label}>Form</span>
                                <span className={css.charac__value}>
                                    {formatCharacForm(camper.form)}
                                </span>
                            </li>
                            <li className={css.charac__item}>
                                <span className={css.charac__label}>Length</span>
                                <span className={css.charac__value}>
                                    {formatCharacSize(camper.length)}
                                </span>
                            </li>
                            <li className={css.charac__item}>
                                <span className={css.charac__label}>Width</span>
                                <span className={css.charac__value}>
                                    {formatCharacSize(camper.width)}
                                </span>
                            </li>
                            <li className={css.charac__item}>
                                <span className={css.charac__label}>Height</span>
                                <span className={css.charac__value}>
                                    {formatCharacSize(camper.height)}
                                </span>
                            </li>
                            <li className={css.charac__item}>
                                <span className={css.charac__label}>Tank</span>
                                <span className={css.charac__value}>
                                    {formatCharacSize(camper.tank)}
                                </span>
                            </li>
                            <li className={css.charac__item}>
                                <span className={css.charac__label}>Consumption</span>
                                <span className={css.charac__value}>
                                    {formatCharacConsumption(camper.consumption)}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className={css.camper__reviews__section}>
                <h2>Reviews</h2>
                <div className={css.camper__reviews__block}>
                    <div className={css.reviews__details}>
                        <div className={css.reviews__list}>
                            {reviews.map(ev => (
                                <ReviewItem key={ev.id} review={ev} />
                            ))}
                        </div>
                    </div>
                    <BookingSection
                        camperId={camper.id}
                        isBooked={isBooked}
                        onBookingStart={handleBookingInProcess}
                        onBookingSuccess={handleBookingSuccess}
                    />
                </div>
            </section>
        </section>
    );
}

export default CamperInfo;
