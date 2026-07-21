import { getCamperById, getReviewsbyId } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CamperDetailsClient from './CamperDetails.client';

type CamperInfoProps = {
    params: Promise<{ camperId: string }>;
};

async function CamperDetails({ params }: CamperInfoProps) {
    const { camperId } = await params;
    const queryClient = new QueryClient();

    try {
        const camper = await getCamperById(camperId);

        if (!camper) {
            notFound();
        }

        await queryClient.prefetchQuery({
            queryKey: ['camper', camperId],
            queryFn: () => getCamperById(camperId),
        });

        await queryClient.prefetchQuery({
            queryKey: ['reviews', camperId],
            queryFn: () => getReviewsbyId(camperId),
        });
    } catch {
        throw new Error('Failed to load camper data from server');
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CamperDetailsClient />
        </HydrationBoundary>
    );
}

export default CamperDetails;
