// import { PrismaClient } from "@prisma/client";


// declare global {
//     let prisma: PrismaClient | undefined;
// };

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// export default client;
// import { PrismaClient } from "@prisma/client";

// declare global {
//   // Mở rộng đúng globalThis
//   let prisma: PrismaClient | undefined;
// }

// const client = global.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = client;

// export default client;
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

