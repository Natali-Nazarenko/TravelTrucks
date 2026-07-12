import { Review } from '@/types/review';
import css from './ReviewItem.module.css';
import { Icon } from '../Icon/Icon';

type ReviewItemProps = {
    review: Review;
};

function ReviewItem({ review }: ReviewItemProps) {
    const roundRating = Math.round(review.reviewer_rating);
    return (
        <div className={css.review__item}>
            <div className={css.reviewer__title}>
                <div className={css.reviewer__avatar}>{review.reviewer_name[0]}</div>
                <div className={css.block__name__star}>
                    <div className={css.reviewer_name}>{review.reviewer_name}</div>
                    <div className={css.reviewer_stars}>
                        {[...Array(5)].map((_, index) => {
                            return (
                                <Icon
                                    key={index}
                                    name="icon-star"
                                    sizeWidth={16}
                                    className={
                                        index < roundRating ? css.star__filled : css.star__empty
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={css.review__comment}>{review.comment}</div>
        </div>
    );
}

export default ReviewItem;
{
    /* {review.reviewer_rating} */
}
