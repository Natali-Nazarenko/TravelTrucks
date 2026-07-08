import { CamperDetails } from '@/types/camper';
import css from './CamperInfo.module.css';
import { Review } from '@/types/review';

type CamperInfoProps = {
    camper: CamperDetails;
    reviews: Review[];
};

function CamperInfo({ camper, reviews }: CamperInfoProps) {
    console.log(camper, reviews);

    return (
        <section className={css.container}>
            <div className={css.camper__block}>
                <div></div>
                <div></div>
            </div>
        </section>
    );
}

export default CamperInfo;
