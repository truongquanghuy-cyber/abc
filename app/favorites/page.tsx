import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavorties";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return(
    <ClientOnly>
        <FavoritesClient
            listings={listings}
            currentUser={currentUser} // Chưa có currentUser, cần phải truyền vào sau
        />
    </ClientOnly>
  )
};

export default ListingPage;
