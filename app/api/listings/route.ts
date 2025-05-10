
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUsers from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUsers();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

        Object.keys(body).forEach((value: string) => {
            if(!body[value]){
                NextResponse.error();
            }
        });
        // for (const key in body) {
        //     if (!body[key]) {
        //       return NextResponse.json({ error: `${key} is required` }, { status: 400 });
        //     }
        //   }
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}