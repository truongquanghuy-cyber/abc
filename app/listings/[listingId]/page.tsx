import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({params} : {params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ListingClient 
                listing={listing}
                reservations={reservations} // Chưa có reservations, cần phải truyền vào sau
                currentUser={currentUser} // Chưa có currentUser, cần phải truyền vào sau
            />
        </ClientOnly>


    );
}

export default ListingPage;