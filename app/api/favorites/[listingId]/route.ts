import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUsers from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUsers();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}



export async function DELETE(
  request: Request,
  {params} : {params : IParams}
){
  const currentUser = await getCurrentUsers();
  if (!currentUser){
    return NextResponse.error();
  }
  const {listingId} = params;
  
  if (!listingId || typeof listingId !== "string"){
    throw new Error("Invalid ID");
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds =  favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });
  return NextResponse.json(user); 

};
// /app/api/favorites/[listingId]/route.ts
// import { NextResponse } from "next/server";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//   listingId?: string;
// }

// export async function POST(request: Request, { params }: { params: IParams }) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) return NextResponse.error();

//   const { listingId } = params;
//   if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID");

//   const updatedUser = await prisma.user.update({
//     where: { id: currentUser.id },
//     data: {
//       favoriteIds: {
//         push: listingId
//       }
//     }
//   });

//   return NextResponse.json(updatedUser);
// }

// export async function DELETE(request: Request, { params }: { params: IParams }) {
//   const currentUser = await getCurrentUser();
//   if (!currentUser) return NextResponse.error();

//   const { listingId } = params;
//   if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID");

//   const favoriteIds = currentUser.favoriteIds.filter((id: string) => id !== listingId);

//   const updatedUser = await prisma.user.update({
//     where: { id: currentUser.id },
//     data: { favoriteIds }
//   });

//   return NextResponse.json(updatedUser);
// }

