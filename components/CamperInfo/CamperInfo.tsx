import Image from 'next/image';

import { CamperDetails } from '@/types/camper';
import css from './CamperInfo.module.css';
import { Review } from '@/types/review';
import { Icon } from '../Icon/Icon';

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
    console.log(camper.gallery[0].original);

    return (
        <section className={css.container}>
            <div className={css.camper}>
                <div className={css.camper__info__block}>
                    <div className={css.camper__images}>
                        <Image
                            src={`${camper.gallery[0].original}`}
                            alt="big image camper"
                            width={638}
                            height={505}
                        />
                        <div className={css.small__images}>
                            {camper.gallery.map(ev => (
                                <Image
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
                                <div className={css.camper__info}>
                                    <Icon name="icon-star" size={24} />
                                    <div
                                        className={css.camper__rating}
                                    >{`${camper.rating}(${camper.totalReviews} Reviews)`}</div>
                                    <div className={css.camper__location}>
                                        <Icon name="icon-map" size={16} />
                                        <span>{formatLocation(camper.location)}</span>
                                    </div>
                                </div>

                                <p className={css.car__price}>
                                    <Icon name="icon-euro" size={32} />
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
                                        {ev}
                                    </div>
                                ))}
                            </div>
                            <div className={css.line}></div>
                        </div>
                    </div>
                </div>
                <div className={css.camper__reviews__block}></div>
            </div>
        </section>
    );
}

export default CamperInfo;
