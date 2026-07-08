import { Camper } from '@/types/camper';
import css from './CamperInfo.module.css';
import { Review } from '@/types/review';

type CamperInfoProps = {
    camper: Camper;
    reviews: Review[];
};

function CamperInfo({ camper, reviews }: CamperInfoProps) {
    return <></>;
}

export default CamperInfo;
