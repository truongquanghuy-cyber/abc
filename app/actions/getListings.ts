// import prisma from "@/app/libs/prismadb";

// export interface IListingsParams {
//     userId?: string;
// }

// export default async function getListings(
//     params: IListingsParams
// ) {
//     try {
//         const { userId } = params;
//         const query: any = {};

//         if (userId) {
//             query.userId = userId;
//         }
        

//         const listings = await prisma.listing.findMany({
//             where: query,
//             orderBy: {
//                 createdAt: 'desc'
//             }
//         });

//        const SafeListings = listings.map((listing) => ({
//         ...listing,
//         createdAt: listing.createdAt.toISOString(),
//        }));

//        return SafeListings;

//     }catch (error: any) {
//       throw new Error(error);
//     }
// };

import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams = {}) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params

    const query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error: any) {
    console.error("Error fetching listings:", error)
    throw new Error(error)
  }
}
