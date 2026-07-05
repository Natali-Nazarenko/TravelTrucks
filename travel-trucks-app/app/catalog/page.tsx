import Button from '@/components/Button/Button';
import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '@/lib/api';

async function Campers() {
    const { campers } = await getCampers(1);
    // console.log('campers: ', campers);

    return (
        <section>
            {campers?.length > 0 && <CamperList campers={campers} />}
            <Button text="Load more" />
        </section>
    );
}

export default Campers;
