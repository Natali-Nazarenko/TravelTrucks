import Image from 'next/image';

import { CamperDetails } from '@/types/camper';
import css from './CamperInfo.module.css';
import { Review } from '@/types/review';
import { Icon } from '../Icon/Icon';
import ReviewItem from '../ReviewItem/ReviewItem';

type CamperInfoProps = {
    camper: CamperDetails;
    reviews: Review[];
};

function CamperInfo({ camper, reviews }: CamperInfoProps) {
    const formatLocation = (location: string) => {
        if (!location) return '';
        const parts = location.split(',').map(part => part.trim());
        if (parts.length < 2) return parts[0];
        return `${parts[1]}, ${parts[0]}`;
    };

    const formatCharacForm = (charac: string) => {
        if (!location) return '';
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

    return (
        <section className={`container ${css.container}`}>
            <div className={css.camper__info__block}>
                <div className={css.camper__images__block}>
                    <Image
                        className={css.main__image}
                        src={`${camper.gallery[0].original}`}
                        alt="big image camper"
                        width={638}
                        height={505}
                    />
                    <div className={css.small__images}>
                        {camper.gallery.map(ev => (
                            <Image
                                className={css.secondary__image}
                                key={camper.id}
                                src={`${ev.thumb}`}
                                alt={`small image camper ${camper.name}`}
                                width={136}
                                height={144}
                            />
                        ))}
                    </div>
                </div>
                <div className={css.camper__details}>
                    <div className={css.camper__description}>
                        <div>
                            <h2>{camper.name}</h2>
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
                                <Icon name="icon-euro" sizeWidth={32} />
                                {`${camper.price}`}
                            </p>
                        </div>
                        <p className={css.car__description}>{camper.description}</p>
                    </div>
                    <div className={css.camper__oprions}>
                        <h2>Vehicle details</h2>
                        <div className={css.camper__block__amenities}>
                            {camper.amenities.map(ev => (
                                <div key={camper.id} className={css.camper__amenity}>
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
            <div className={css.camper__reviews__block}>
                <h2>Reviews</h2>
                <div className={css.reviews__details}>
                    <div className={css.reviews__list}>
                        {reviews.map(ev => (
                            <ReviewItem key={ev.id} review={ev} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CamperInfo;
