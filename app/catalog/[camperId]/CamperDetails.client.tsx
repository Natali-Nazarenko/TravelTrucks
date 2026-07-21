'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { getCamperById, getReviewsbyId } from '@/lib/api';
import CamperInfo from '@/components/CamperInfo/CamperInfo';

const Modal = dynamic(() => import('@/components/Modal/Modal'), { ssr: false });

function CamperDetailsClient() {
    const { camperId } = useParams<{ camperId: string }>();

    const { data: camper, isLoading: isLoadingCamper } = useQuery({
        queryKey: ['camper', camperId],
        queryFn: () => getCamperById(camperId),
        refetchOnMount: false,
    });

    const { data: reviews, isLoading: isLoadingReviews } = useQuery({
        queryKey: ['reviews', camperId],
        queryFn: () => getReviewsbyId(camperId),
        refetchOnMount: false,
    });

    const isPageloading = isLoadingCamper || isLoadingReviews;

    return (
        <>
            {isPageloading && <Modal />}
            {!isPageloading && camper && reviews && (
                <CamperInfo camper={camper} reviews={reviews} />
            )}
        </>
    );
}

export default CamperDetailsClient;
