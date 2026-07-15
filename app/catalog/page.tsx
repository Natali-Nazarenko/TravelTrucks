import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '@/lib/api';

async function Campers() {
    const { campers } = await getCampers(1);
    // console.log('campers: ', campers);

    return <section>{campers?.length > 0 && <CamperList campers={campers} />}</section>;
}

export default Campers;
