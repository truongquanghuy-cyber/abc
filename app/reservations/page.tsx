import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";

import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized"
                    subtitle="Please login"
                /> 
            </ClientOnly>
        )
    };

    const reservations = await getReservations({userId: currentUser.id});
    if(reservations.length === 0) {
        return(
            <ClientOnly>
                <EmptyState 
                    title="No reservation found"
                    subtitle="Looks like you havent reservations on your properties."
                />
            </ClientOnly>
        )
    };
    return(
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser} // Chưa có currentUser, cần phải truyền vào sau
            />    
        </ClientOnly>
    )
};

export default ReservationsPage;

