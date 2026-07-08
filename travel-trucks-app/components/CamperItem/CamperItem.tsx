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

    const handleClick = () => {};

    return (
        <div className={css.block__camper__item}>
            <li className={css.item__li}>
                <Image
                    className={css.image}
                    src={item.coverImage}
                    alt="image camper"
                    width={219}
                    height={240}
                />
                <div className={css.item__description}>
                    <div className={css.item__title}>
                        <h2>{item.name}</h2>
                        <p>
                            <Icon name="icon-euro" size={24} />
                            {`${item.price}`}
                        </p>
                    </div>
                    <div className={css.info}>
                        <div
                            className={css.rating}
                        >{`${item.rating}(${item.totalReviews} Reviews)`}</div>
                        <div className={css.location}>
                            <Icon name="icon-map" size={16} />
                            <span>{formatLocation(item.location)}</span>
                        </div>
                        <p className={css.car__description}>{item.description}</p>
                        <ul className={css.options}>
                            <li>
                                <Icon name="icon-petrol" size={20} />
                                {item.engine}
                            </li>
                            <li>
                                <Icon name="icon-gearbox" size={20} />
                                {item.transmission}
                            </li>
                            <li>
                                <Icon name="icon-car" size={20} />
                                {item.form}
                            </li>
                        </ul>
                    </div>
                    <Button text="Show more" onclick={handleClick} />
                </div>
            </li>
        </div>
    );
}

export default CamperItem;
