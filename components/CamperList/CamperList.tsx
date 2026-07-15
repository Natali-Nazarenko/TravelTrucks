import css from './CamperList.module.css';
import { Camper } from '@/types/camper';
import CamperItem from '../CamperItem/CamperItem';
import Button from '../Button/Button';

type CamperListProps = {
    campers: Camper[];
    hasNextPage: boolean;
    onLoadMore: () => void;
};

function CamperList({ campers, hasNextPage, onLoadMore }: CamperListProps) {
    return (
        <section className={css.block__campers__list}>
            <ul className={css.list__ul}>
                {campers.map(camper => (
                    <CamperItem key={camper.id} item={camper} />
                ))}
            </ul>
            {hasNextPage && (
                <Button
                    className={css.list__btn__loadmore}
                    text="Load more"
                    type="button"
                    onClick={onLoadMore}
                />
            )}
        </section>
    );
}

export default CamperList;
