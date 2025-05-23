import prisma from "../libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params : IParams
) {
    try {
        const { listingId } = params;
        const listing = await prisma.listing.findUnique({
            where : {
                id: listingId
            },
            include: {
                user: true,
            }
        });
        if (!listing) {
            return null;
        }
        return{
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createAt: listing.user.createdAt.toISOString(),
                updateAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        };

    } catch (error: any) {
        throw new Error(error);
    }
}