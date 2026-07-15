import css from './CamperList.module.css';
import { Camper } from '@/types/camper';
import CamperItem from '../CamperItem/CamperItem';

type CamperListProps = {
    campers: Camper[];
};

function CamperList({ campers }: CamperListProps) {
    return (
        <ul>
            {campers.map(camper => (
                <CamperItem key={camper.id} item={camper} />
            ))}
        </ul>
    );
}

export default CamperList;
