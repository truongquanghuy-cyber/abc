import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUsers from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
    const currentUser = await getCurrentUsers();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    })
    return NextResponse.json(listingAndReservation);

}