import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    password:"Pass@123",
    todos: {
     create: [
        {
          task: "JS coding Pollyfill",
          description: "Finish Pollyfill for promises",
          status: false,
        },{
          task: "Book moviw spiderman",
          description: "Book tickets for spiderman",
          status: false,
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password:"Pass@123",
    todos: {
      create: [
        {
          task: "DSA DP coding",
          description: "Finish DP section from DSA Sheet",
          status: false,
        },{
          task: "Book india tickets",
          description: "Book tickets to india",
          status: false,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();