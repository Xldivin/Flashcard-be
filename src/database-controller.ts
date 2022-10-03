import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    const newLink = await prisma.flashcard.create({
        data: {
          description: 'Fullstack tutorial for GraphQL',
          answer: 'cool my gee',
          question: 'how is you',
        },
      })
    const allFlashcard = await prisma.flashcard.findMany();
    console.log(allFlashcard);
}


main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
});