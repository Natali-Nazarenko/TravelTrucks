import { getCamperById, getReviewsbyId } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CamperDetailsClient from './CamperDetails.client';

type CamperInfoProps = {
    params: Promise<{ camperId: string }>;
};

async function CamperDetails({ params }: CamperInfoProps) {
    const { camperId } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['camper', camperId],
        queryFn: () => getCamperById(camperId),
    });

    await queryClient.prefetchQuery({
        queryKey: ['reviews', camperId],
        queryFn: () => getReviewsbyId(camperId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CamperDetailsClient />
        </HydrationBoundary>
    );
}

export default CamperDetails;
