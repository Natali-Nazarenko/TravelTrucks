'use client';

import Image from 'next/image';

import { Camper } from '@/types/camper';
import css from './CamperItem.module.css';
import { Icon } from '../Icon/Icon';
import Button from '../Button/Button';

interface CamperProps {
    item: Camper;
}

function CamperItem({ item }: CamperProps) {
    const formatLocation = (location: string) => {
        if (!location) return '';
        const parts = location.split(',').map(part => part.trim());
        if (parts.length < 2) return parts[0];
        return `${parts[1]}, ${parts[0]}`;
    };

    const handleClick = () => {
        window.open(`/catalog/${item.id}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={css.block__camper__item}>
            <div className={css.item}>
                <Image
                    className={css.item__image}
                    src={item.coverImage}
                    alt="image camper"
                    width={219}
                    height={240}
                />
                <div className={css.item__description}>
                    <div className={css.item__title}>
                        <div className={css.title__text}>
                            <h2 className={css.title__header}>{item.name}</h2>
                            <p className={css.title__price}>
                                <Icon name="icon-euro" sizeWidth={18} />
                                {`${item.price}`}
                            </p>
                        </div>
                        <div className={css.item__rating}>
                            <Icon name="icon-star" sizeWidth={18} className={css.rating__star} />
                            <div className={css.rating__details}>
                                {`${item.rating}(${item.totalReviews} Reviews)`}
                            </div>
                            <div className={css.item__location}>
                                <Icon name="icon-map" sizeWidth={16} />
                                <span>{formatLocation(item.location)}</span>
                            </div>
                        </div>
                    </div>
                    <p className={css.item__desc__text}>{item.description}</p>
                    <ul className={css.item__options}>
                        <li>
                            <Icon name="icon-petrol" sizeWidth={20} />
                            {item.engine.charAt(0).toUpperCase() + item.engine.slice(1)}
                        </li>
                        <li>
                            <Icon name="icon-gearbox" sizeWidth={20} />
                            {item.transmission.charAt(0).toUpperCase() + item.transmission.slice(1)}
                        </li>
                        <li>
                            <Icon name="icon-car" sizeWidth={22} />
                            {item.form.charAt(0).toUpperCase() + item.form.slice(1)}
                        </li>
                    </ul>
                    <Button text="Show more" onClick={handleClick} type="button" />
                </div>
            </div>
        </div>
    );
}

export default CamperItem;
