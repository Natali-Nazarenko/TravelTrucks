import css from './CamperList.module.css';
import { Camper } from '@/types/camper';
import CamperItem from '../CamperItem/CamperItem';

type CamperListProps = {
    campers: Camper[];
};

function CamperList({ campers }: CamperListProps) {
    return (
        <section className={css.block__campers__list}>
            <ul className={css.campers__ul}>
                {campers.map(camper => (
                    <CamperItem key={camper.id} item={camper} />
                ))}
            </ul>
        </section>
    );
}

export default CamperList;
